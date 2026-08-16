import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || "dev.adit01@gmail.com";

    // 1. Try Resend if API key is provided
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [recipientEmail],
        replyTo: email,
        subject: `New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #AD262D; border-bottom: 2px solid #AD262D; padding-bottom: 8px;">New Contact Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-left: 4px solid #AD262D; border-radius: 4px;">
              <strong>Message:</strong>
              <p style="white-space: pre-wrap; margin-top: 8px;">${message}</p>
            </div>
            <hr style="margin-top: 24px; border: none; border-top: 1px solid #e2e8f0;" />
            <p style="font-size: 11px; color: #64748b;">Sent from your portfolio website contact form.</p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
      } else {
        return NextResponse.json({ success: true, message: "Email sent successfully via Resend!" });
      }
    }

    // 2. Try Nodemailer / SMTP if credentials exist
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: (process.env.SMTP_PORT === "465" || !process.env.SMTP_PORT),
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name} (Portfolio)" <${smtpUser}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `New Portfolio Contact: ${name}`,
        text: `From: ${name} (${email})\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
            <h2 style="color: #AD262D;">New Portfolio Message</h2>
            <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
            <div style="margin: 15px 0; padding: 12px; background: #f1f5f9; border-radius: 6px;">
              <p style="white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
          </div>
        `,
      });

      return NextResponse.json({ success: true, message: "Email sent successfully via SMTP!" });
    }

    // 3. Cloud Forwarding fallback (e.g. Web3Forms API)
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY";
    if (web3Key && web3Key !== "YOUR_ACCESS_KEY") {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3Key,
          name,
          email,
          message,
          subject: `Portfolio Contact from ${name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        return NextResponse.json({ success: true, message: "Email forwarded successfully!" });
      }
    }

    // If no provider environment variables are configured yet in dev/local mode
    console.log(`[Contact Form Received] Name: ${name}, Email: ${email}, Message: ${message}`);
    return NextResponse.json({
      success: true,
      simulated: true,
      message: "Message received! (Configure RESEND_API_KEY or SMTP_USER/SMTP_PASS in production to send live emails directly)."
    });

  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process contact message." },
      { status: 500 }
    );
  }
}
