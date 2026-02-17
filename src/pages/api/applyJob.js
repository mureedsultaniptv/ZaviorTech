import { createClient } from "@sanity/client";

// Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Disable body parsing so we can handle file uploads manually
export const config = {
  api: {
    bodyParser: false,
  },
};

// In-memory rate-limit map (light usage only)
const rateLimitStore = new Map();

// Helper: parse multipart/form-data
async function parseForm(req) {
  return new Promise((resolve, reject) => {
    let data = Buffer.alloc(0);
    req.on("data", (chunk) => {
      data = Buffer.concat([data, chunk]);
    });
    req.on("end", () => {
      const boundary = req.headers["content-type"].split("boundary=")[1];
      if (!boundary) return reject("No boundary in request");

      const parts = data
        .toString()
        .split(`--${boundary}`)
        .filter((part) => part && part !== "--\r\n");

      const result = {};
      parts.forEach((part) => {
        const [rawHeaders, rawContent] = part.split("\r\n\r\n");
        if (!rawHeaders || !rawContent) return;

        const nameMatch = rawHeaders.match(/name="([^"]+)"/);
        if (!nameMatch) return;

        const name = nameMatch[1];
        if (rawHeaders.includes("filename")) {
          // It's a file
          const filenameMatch = rawHeaders.match(/filename="([^"]+)"/);
          const filename = filenameMatch ? filenameMatch[1] : "file";
          const content = Buffer.from(
            rawContent.replace(/\r\n$/, ""),
            "binary",
          );
          result[name] = { filename, content };
        } else {
          // Regular field
          result[name] = rawContent.replace(/\r\n$/, "");
        }
      });

      resolve(result);
    });
    req.on("error", (err) => reject(err));
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    // Rate-limit per IP
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || // behind proxies like Vercel
      req.socket?.remoteAddress || // normal IP
      "unknown"; // fallback

    // Convert IPv6 loopback (::1) to IPv4 loopback (127.0.0.1) for local
    const cleanIp = ip === "::1" ? "127.0.0.1" : ip;
    // const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const now = Date.now();
    const last = rateLimitStore.get(cleanIp);
    if (last && now - last < 2 * 60 * 1000) {
      return res
        .status(429)
        .json({
          message: "Too many submissions from this IP. Wait 2 minutes.",
        });
    }
    rateLimitStore.set(cleanIp, now);

    // Parse multipart form
    const form = await parseForm(req);

    const { name, email, phone, linkedin, portfolio, cover, jobId } = form;
    const resumeFile = form.resume;

    if (!name || !email || !resumeFile) {
      return res
        .status(400)
        .json({ message: "Name, email, and resume are required" });
    }

    // Upload file to Sanity
    const uploadedFile = await client.assets.upload(
      "file",
      resumeFile.content,
      {
        filename: resumeFile.filename,
      },
    );

    // Create application document
    const doc = {
      _type: "jobApplication",
      jobId,
      name,
      email,
      phone: phone || "",
      linkedin: linkedin || "",
      portfolio: portfolio || "",
      coverLetter: cover || "",
      resume: {
        _type: "file",
        asset: { _type: "reference", _ref: uploadedFile._id },
      },
      submittedAt: new Date().toISOString(),
      ip,
    };

    await client.create(doc);

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.toString() });
  }
}
