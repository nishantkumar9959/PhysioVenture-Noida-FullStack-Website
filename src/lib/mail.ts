import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const recipientEmail = process.env.NOTIFICATION_EMAIL_RECIPIENT || "webstudio.n16@gmail.com";
const fromEmail = process.env.RESEND_FROM || "onboarding@resend.dev";

// Initialize Resend client only if API key is present
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface EmailParams {
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ subject, html, text }: EmailParams): Promise<boolean> {
  if (!resend) {
    console.log("=========================================");
    console.log(`[MOCK EMAIL SENT] (Resend API key not set)`);
    console.log(`To: ${recipientEmail}`);
    console.log(`From: ${fromEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body (Text): ${text || "See HTML representation"}`);
    console.log(`Body (HTML):\n${html}`);
    console.log("=========================================");
    return true;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `PhysioVenture <${fromEmail}>`,
      to: [recipientEmail],
      subject: subject,
      html: html,
      text: text,
    });

    if (error) {
      console.error("Resend API error:", error);
      return false;
    }

    console.log(`Email successfully sent to ${recipientEmail}. ID: ${data?.id}`);
    return true;
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return false;
  }
}
