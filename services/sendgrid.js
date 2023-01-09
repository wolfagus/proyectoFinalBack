const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();


const sendNodeMailer = async (user) => {
  console.log(user)
  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SEND, 
        pass: process.env.NODEMAILER_PASS, 
      },
    });


    const info = await transporter.sendMail({
      from: '"naturDiet" <agustinmercado1234@gmail.com>', // sender address
      to: user.userEmail, // list of receivers
      subject: user.subject, // Subject line
      html: user.htmlMsg, // html body
    });

  } catch (error) {
    console.log(error)
  }


}


module.exports = { sendNodeMailer }