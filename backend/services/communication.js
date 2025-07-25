require('dotenv').config();
const twilio = require('twilio');
const sgMail = require('@sendgrid/mail');

// Twilio setup
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioFrom = process.env.TWILIO_PHONE_NUMBER;

// Send SMS function
async function sendSMS(to, body) {
  if (!to.startsWith('+')) throw new Error('Phone number must be in E.164 format, e.g. +1234567890');
  const message = await twilioClient.messages.create({
    from: twilioFrom,
    to,
    body,
  });
  return message;
}

// SendGrid setup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send Email function
async function sendEmail(to, subject, text) {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL, // Verified sender email from SendGrid
    subject,
    text,
  };
  const response = await sgMail.send(msg);
  return response;
}

module.exports = {
  sendSMS,
  sendEmail,
};
