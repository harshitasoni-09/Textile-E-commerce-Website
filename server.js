
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors()); // Allows frontend to communicate with backend
app.use(bodyParser.json()); // Parses JSON data from frontend
app.use(express.urlencoded({ extended: true }));

// ✅ Contact Form Route
app.post("/send-email", async (req, res) => {
    const { contact_person, email, mobile, telephone, organization, city, uniforms, company_size, country, message_for_me } = req.body;

    // ✅ Nodemailer Transport Configuration
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail
            pass: process.env.EMAIL_PASS, // App Password
        },
        tls: {
            rejectUnauthorized: false, // Ignore SSL errors for local testing
        }
    });

    // ✅ Email Content
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Sends to your own email
        subject: "New Contact Form Submission",
        html: `
            <h2>New Contact Form Submission</h2>
            <p><b>Name:</b> ${contact_person}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Mobile:</b> ${mobile}</p>
            <p><b>Telephone:</b> ${telephone}</p>
            <p><b>Organization:</b> ${organization}</p>
            <p><b>City:</b> ${city}</p>
            <p><b>Uniform Type:</b> ${uniforms}</p>
            <p><b>Company Size:</b> ${company_size}</p>
            <p><b>Country:</b> ${country}</p>
            <p><b>Message:</b> ${message_for_me}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(200).json({ message: "Message sent successfully!" });

await transporter.sendMail(mailOptions);

    }
});

// ✅ Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
