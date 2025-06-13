import nodemailer from "nodemailer";
import user from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const token = Math.random().toString(36).slice(-8); // Generate a random token
    const hashedToken = await bcryptjs.hash(token, 10);

    // await user.findByIdAndUpdate(userId, {
    //   verifyToken: hashedToken,
    //   verifyTokenExpiry: Date.now() + 3600000,
    // });

    if (emailType === "VERIFY") {
      await user.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await user.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8099acf045891d",
        pass: "51c274f6813b14",
      },
    });
    const mailOptions = {
      from: "amaan@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${token}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link in your browser: <br>${process.env.DOMAIN}/verifyemail?token=${token}</p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}; 
