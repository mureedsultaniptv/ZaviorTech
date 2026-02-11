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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = req.body;

  // Respond to the user immediately (async background logic)
  res
    .status(200)
    .json({ success: true, message: "Form submitted successfully." });

  try {
    // 1️⃣ Save lead to Sanity
    await sanity.create({
      _type: "leadzaviorForm",
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      message: data.message,
      createdAt: new Date().toISOString(),
    });

    // 2️⃣ Configure email transport
    // const transporter = nodemailer.createTransport({
    //   host: process.env.EMAIL_SERVER_HOST,
    //   port: Number(process.env.EMAIL_SERVER_PORT),
    //   auth: {
    //     user: process.env.EMAIL_SERVER_USER,
    //     pass: process.env.EMAIL_SERVER_PASSWORD,
    //   },
    // });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    });

    // 3️⃣ Email to admin
    const adminMail = {
      from: `"Zavior Website" <${process.env.EMAIL_FROM}>`,
      to: "mureedsultan11@gmail.com",
      subject: `📬 New Lead from ${data.firstName} ${data.lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    };

    // 4️⃣ Thank-you email to user
    const userMail = {
      from: `"Zavior Technologies" <${process.env.EMAIL_FROM}>`,
      to: data.email,
      subject: "Thank you for contacting Zavior Technologies",
      html: `
        <h2>Thank you, ${data.firstName}!</h2>
        <p>We’ve received your message and our team will get back to you shortly.</p>
        <p><strong>Your submitted details:</strong></p>
        <ul>
          <li><b>Service Interested:</b> ${data.service}</li>
          <li><b>Message:</b> ${data.message}</li>
        </ul>
        <p>Best regards,<br/>Zavior Technologies Team</p>
      `,
    };

    // 5️⃣ Send both emails asynchronously
    await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(userMail),
    ]);

    console.log("✅ Lead saved & emails sent successfully!");
  } catch (err) {
    console.error("❌ Error handling lead form:", err);
  }
}
