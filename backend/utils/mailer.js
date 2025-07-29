const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,      // Your Gmail email
    pass: process.env.EMAIL_PASSWORD,  // Your Gmail app password
  },
});

const sendResetEmail = (to, token) => {
  const resetUrl = `http://localhost:3000/reset-password/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset Request',
    text: `Click this link to reset your password: ${resetUrl}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
