const express = require("express");
require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send({ message: "server is running" });
});

app.post("/send", (req, res) => {
  const { name, email, message, subject } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: "golam.aziz.tanvir49@gmail.com", // Replace with your Gmail address
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error sending email." });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ message: "Email sent successfully!" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
