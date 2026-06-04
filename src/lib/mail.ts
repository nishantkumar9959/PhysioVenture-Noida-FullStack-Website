import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const recipientEmail = process.env.NOTIFICATION_EMAIL_RECIPIENT || "";
const fromEmail = process.env.RESEND_FROM || "onboarding@resend.dev";

// Initialize Resend client only if API key is present
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface EmailParams {
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ subject, html, text }: EmailParams): Promise<boolean> {
  if (!resend || !recipientEmail) {
    // In development / misconfigured environments, log a non-sensitive notice only.
    console.warn("[sendEmail] RESEND_API_KEY or NOTIFICATION_EMAIL_RECIPIENT is not configured. Email not sent.");
    return false;
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

    console.log(`[sendEmail] Email sent successfully. ID: ${data?.id}`);
    return true;
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return false;
  }
}
