const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();


const sendNodeMailer = async (user) => {
  console.log(user)
  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SEND, 
        pass: process.env.NODEMAILER_PASS, 
      },
    });


    const info = await transporter.sendMail({
      from: '"Mr Chef" <agustinmercado1234@gmail.com>',
      to: user.userEmail, 
      subject: user.subject, 
      html: user.htmlMsg,
    });

  } catch (error) {
    console.log(error)
  }


}


module.exports = { sendNodeMailer }