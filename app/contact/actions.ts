import { Resend } from "resend";
import { ContactTemplate } from "@/components/email/contact-template";
import { contactFormSchema, type ContactFormData } from "./contact";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(data: ContactFormData) {
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    return {success: false, error: result.error.format()};
  }

  const { firstName, lastName, email, phone, inquiryType, subject, message } = result.data;

  const sendEmail = await resend.emails.send({
    from: "Yendaaky Jobs Center Website <info@yendaakyejobscenter.com>",
    to: ["Yendaaky <yendaakyejobcenter@proton.me>"],
    subject: `${inquiryType}: ${subject}`,
    react: ContactTemplate({ firstName, lastName, email, phone, inquiryType, subject, message }),
  }).then(
    (data: any) => ({success: true, data}),
    (error: any) => ({success: false, error})
  )
  return sendEmail;
}