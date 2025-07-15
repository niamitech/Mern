const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendLeadEmail = async (lead) => {
  const mailOptions = {
    from: `"MERN App" <${process.env.EMAIL_USER}>`,
    to: lead.email,
    subject: "Thank You for Your Submission",
    text: `Hi ${lead.name},\n\nThank you for reaching out!\n\nYour message: "${lead.message}"\n\nWe'll get back to you shortly.\n\nBest,\nMERN Team`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendLeadEmail;
