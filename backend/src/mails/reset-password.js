import { transporter } from "../lib/nodemailer.js";

// Mail to reset password
export const resetMail = async (email, newPassword) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your password has been reset",
    text: `Your new password is: ${newPassword}`,
  });
};
