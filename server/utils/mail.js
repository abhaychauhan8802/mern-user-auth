import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

export const sendToken = async (email, subject, text) => {
  await transporter.sendMail({
    from: process.env.AUTH_USER,
    to: email,
    subject,
    text,
  });
};
