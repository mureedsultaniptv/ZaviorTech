import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("🟢 [API] Lead form endpoint hit");

  if (req.method !== "POST") {
    console.warn("⚠️ [API] Method not allowed:", req.method);
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = req.body;
  console.log("📥 [API] Incoming form data:", JSON.stringify(data, null, 2));

  // Respond immediately
  res.status(200).json({ success: true, message: "Form submitted successfully." });
  console.log("✅ [API] Immediate response sent to client");

  try {
    // 1️⃣ Save to Sanity
    console.log("🟡 [SANITY] Attempting to save lead...");
    const savedLead = await sanity.create({
      _type: "leadzaviorForm",
      ...data,
      createdAt: new Date().toISOString(),
    });
    console.log("✅ [SANITY] Lead saved successfully:", savedLead._id);

    // 2️⃣ Configure email
    console.log("🟡 [EMAIL] Configuring transporter...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    try {
      await transporter.verify();
      console.log("✅ [EMAIL] Transporter verified");
    } catch (verifyErr) {
      console.error("❌ [EMAIL] Verification failed:", verifyErr);
    }

    // Email styles
    const emailStyle = `
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0; }
        .container { background: #ffffff; max-width: 600px; margin: 30px auto; border-radius: 8px; box-shadow: 0 3px 8px rgba(0,0,0,0.05); overflow: hidden; }
        .header { background: #0e4d92; color: #fff; text-align: center; padding: 20px 30px; }
        .header h1 { margin: 0; font-size: 22px; letter-spacing: 0.5px; }
        .content { padding: 25px 30px; color: #333; line-height: 1.6; font-size: 15px; }
        .content h2 { color: #0e4d92; font-size: 18px; margin-top: 0; }
        .info { background: #f3f6fa; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .info p { margin: 5px 0; }
        .footer { text-align: center; padding: 15px; font-size: 13px; color: #777; background: #fafafa; border-top: 1px solid #eee; }
        a { color: #0e4d92; text-decoration: none; }
      </style>
    `;

    // 3️⃣ Admin email (lead notification)
    const adminMail = {
      from: `"Zavior Website" <${process.env.EMAIL_FROM}>`,
      to: "mureedsultan11@gmail.com",
      subject: `📬 New Lead from ${data.firstName} ${data.lastName}`,
      html: `
        ${emailStyle}
        <div class="container">
          <div class="header">
            <h1>New Lead Received</h1>
          </div>
          <div class="content">
            <h2>Lead Details</h2>
            <div class="info">
              <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              <p><strong>Company:</strong> ${data.company}</p>
              <p><strong>Service Interested:</strong> ${data.service}</p>
            </div>
            <h2>Message</h2>
            <p>${data.message}</p>
          </div>
          <div class="footer">
            <p>📩 Zavior Technologies – New Inquiry Notification</p>
          </div>
        </div>
      `,
    };

    // 4️⃣ User thank-you email
    const userMail = {
      from: `"Zavior Technologies" <${process.env.EMAIL_FROM}>`,
      to: data.email,
      subject: "Thank You for Contacting Zavior Technologies",
      html: `
        ${emailStyle}
        <div class="container">
          <div class="header">
            <h1>Thank You, ${data.firstName}!</h1>
          </div>
          <div class="content">
            <p>We’ve received your inquiry and our team will contact you shortly.</p>
            <p>Here’s a summary of what you submitted:</p>
            <div class="info">
              <p><strong>Service Interested:</strong> ${data.service}</p>
              <p><strong>Message:</strong> ${data.message}</p>
            </div>
            <p>We appreciate your trust in <strong>Zavior Technologies</strong>.  
            You’ll hear from us soon!</p>
          </div>
          <div class="footer">
            <p>Best regards,</p>
            <p><strong>Zavior Technologies Team</strong></p>
            <p><a href="https://zavior.com">Visit our website</a></p>
          </div>
        </div>
      `,
    };

    // 5️⃣ Send emails
    console.log("🚀 [EMAIL] Sending emails...");
    const [adminResult, userResult] = await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(userMail),
    ]);

    console.log("✅ [EMAIL] Admin mail:", adminResult.response);
    console.log("✅ [EMAIL] User mail:", userResult.response);
    console.log("🎉 [SUCCESS] Process completed successfully!");
  } catch (err: any) {
    console.error("❌ [ERROR] Lead handling failed:", err.message);
    console.error(err.stack || err);
  }
}