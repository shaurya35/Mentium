import bcrypt from "bcrypt";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import nodemailer from "nodemailer";

export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (userId: number): string => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  const options: SignOptions = {
    expiresIn: Number(process.env.JWT_EXPIRES_IN) || 86400 
  };
  return jwt.sign({ userId }, process.env.JWT_SECRET as Secret, options);
};

export const sendOTPEmail = async (
  email: string,
  otp: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT!),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Todo App" <noreply@todoapp.com>',
    to: email,
    subject: "Your Verification Code",
    text: `Your OTP code is: ${otp}`,
    html: `<b>${otp}</b>`,
  });
};
