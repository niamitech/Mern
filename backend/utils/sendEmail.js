const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject,
    text,
    html
  };

  try {
    await sgMail.send(msg);
    console.log('📧 Email sent');
    return true;
  } catch (error) {
    console.error('❌ SendGrid Email Error:', error);
    return false;
  }
};

module.exports = sendEmail;
