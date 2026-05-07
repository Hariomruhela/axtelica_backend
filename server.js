import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*",
}));

// ✅ SMTP Transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: "it21.hariomruhela@svceindore.ac.in",
    pass: "agbx fyfp wnef mgkk",
  },

  family: 4, // FORCE IPv4
});

// ===============================
// 📩 DEMO FORM API
// ===============================
app.post("/api/demo", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      company,
      email,
      phone,
      employees,
      country,
    } = req.body;

    // ✅ Validation
    if (
      !firstName ||
      !lastName ||
      !company ||
      !email ||
      !phone ||
      !employees ||
      !country
    ) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // ✅ Send Email
   await transporter.sendMail({
  from: `"Axtelica" <it21.hariomruhela@svceindore.ac.in>`,
  to: "hello@techquitoes.com",
  replyTo: email,
      subject: "🚀 New Demo Request",

      html: `
        <div style="max-width:600px;margin:auto;font-family:Arial;padding:20px;border:1px solid #eee;border-radius:8px;">
          
          

          <p><b>Name:</b> ${firstName} ${lastName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Company:</b> ${company}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Employees:</b> ${employees}</p>
          <p><b>Country:</b> ${country}</p>

          <hr style="margin:20px 0;" />

          <p style="color:#666;font-size:12px;">
            Submitted from Axtelica Request demo Page
          </p>

        </div>
      `,
    });

    console.log("✅ Email sent:", response);

    return res.json({ success: true });

  } catch (error) {
    console.error("❌ Email Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to send email",
    });
  }
});


// ===============================
// 📩 CONTACT FORM API
// ===============================
app.post("/api/contact", async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      company,
      phone,
      department,
      message,
    } = req.body;

    // ✅ Validation
    if (
      !email ||
      !firstName ||
      !lastName ||
      !company ||
      !phone ||
      !department ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // ✅ Send Email
    await transporter.sendMail({
      from: "Axtelica <it21.hariomruhela@svceindore.ac.in>",
      to: ["hello@techquitoes.com"],
      replyTo: email,

      // ✅ CHANGED SUBJECT
      subject: "📩 New Contact Message",

      // ✅ CHANGED TEMPLATE
      html: `
        <div style="max-width:600px;margin:auto;font-family:Arial;padding:20px;border:1px solid #eee;border-radius:8px;">
          
          

          <p><b>Name:</b> ${firstName} ${lastName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Company:</b> ${company}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Department:</b> ${department}</p>

          <hr style="margin:20px 0;" />

          <p><b>Message:</b></p>
          <p>${message}</p>

        </div>
      `,
    });

    res.json({ success: true });

  } catch (error) {
    console.error("❌ Contact Error:", error);

    res.status(500).json({
      success: false,
      error: "Failed to send message",
    });
  }
});

// ===============================
// 🟢 TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ===============================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});