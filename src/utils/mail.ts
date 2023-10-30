import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';
import Mail from 'nodemailer/lib/mailer';

config();

export const sendEmail = async (
  subject: string,
  reciever: string,
  content: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions: Mail.Options = {
      from: process.env.EMAIL_USER,
      to: reciever,
      subject: subject,
      html: content,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};
