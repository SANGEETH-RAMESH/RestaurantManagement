import nodemailer from 'nodemailer';

export const sendOtp = async(otp:number,email:string) =>{
    try {
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.APP_GMAIL,
                pass:process.env.APP_PASSWORD
            }
        })

        const mail = {
            from:`"Your App Name" <${process.env.APP_GMAIL}>`,
            to:email,
            subject:'Your OTP Code',
            html:`<p>Your OTP is <b>${otp}</b>.It will expire in 1 minutes</p>`
        }

        await transporter.sendMail(mail);
    } catch (error) {
        console.log(error)
    }
}