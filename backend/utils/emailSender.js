const nodemailer = require('nodemailer');
require("dotenv").config()
const FROM_EMAIL = process.env.FROM_EMAIL
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
// Create a transporter object using your SMTP configuration

// console.log(FROM_EMAIL, EMAIL_PASSWORD)
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other email providers like SendGrid, Mailgun, etc.
  auth: {
    user: FROM_EMAIL, // Your email address
    pass: EMAIL_PASSWORD,   // Your email password (or app-specific password for Gmail)
  },
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: FROM_EMAIL,  // Sender's email
      to,                           // Receiver's email
      subject,                      // Subject line
      text,                         // Plain text body
      html,                         // HTML body (optional)
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.log('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = { sendEmail };
