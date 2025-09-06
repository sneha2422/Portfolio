import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, message } = req.body;

  // Configure your email transport (example: Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'snehavenkatesh14@gmail.com', // <-- Replace with your Gmail address
      pass: 'sneha_14', // <-- Replace with your Gmail App Password
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'snehavenkatesh14@gmail.com', // <-- Replace with your Gmail address
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>\n<p><strong>Email:</strong> ${email}</p>\n<p><strong>Message:</strong><br/>${message}</p>`,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
} 