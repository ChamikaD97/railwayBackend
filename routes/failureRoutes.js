const express = require("express");
const failures = require("../models/failures");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const router = express.Router();

// Create a transporter using environment variables for security
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use Gmail, or another provider
  auth: {
    user:'slrailway1864@gmail.com', // Store your email in .env file
    pass: 'eoqs unqa tvzg hyyi' // Store your email password in .env file
  },
});

// Function to send emails
const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Route to get the list of failures and send email
router.get("/", async (req, res) => {
  try {
    const failureList = await failures.find(); 

    // Example of sending an email
   /* await sendEmail(
      "wifefyhubby@gmail.com",
      "Test Subject",
      "Plain text body",
      "<strong>HTML body</strong>"
    );   
*/
    res.status(200).json(failureList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Failures" });
  }
});

// Example of another route for email logic
router.post("/email", async (req, res) => {
  try {
    const failureList = await failures.find();    
    res.status(200).json(failureList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Failures" });
  }
});

module.exports = router;
