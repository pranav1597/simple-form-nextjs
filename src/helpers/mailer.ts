import nodemailer from 'nodemailer'
import User from "@/models/userModels";
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS,
          },
        });

        const mailOptions = {
          from: process.env.MAILER_EMAIL,
          to: email,
          subject:
            emailType === "VERIFY"
              ? "Verify your email"
              : "Reset your password",
          html: `<p>Click <a href="${emailType}==="VERIFY" ? "${
            process.env.DOMAIN
          }/verifyEmail?token=${hashedToken}" : "${
            process.env.DOMAIN
          }/verifyForgotPassword?token=${hashedToken}">here</a> to ${
            emailType === "VERIFY" ? "verify your email" : "reset your password"
          }
            ${
              emailType === "VERIFY"
                ? `<p>Or copy this link into your browser: ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}</p>`
                : `<p>Or copy this link into your browser: ${process.env.DOMAIN}/verifyForgotPassword?token=${hashedToken}</p>`
            }
            </p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    }
    catch (error: any){
        throw new Error(error.message)
        
    }
}