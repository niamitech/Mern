const Lead = require('../models/leadModel');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // make sure .env has the key

// Import Leads Function
const importLeads = async (req, res) => {
  try {
    const leads = req.body.leads;
    if (!Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ message: "No leads to import" });
    }

    const savedLeads = await Lead.insertMany(leads); // ✅ Save to MongoDB

    // ✅ Send email
    const msg = {
      to: 'you@example.com',
      from: 'noreply@yourdomain.com',
      subject: 'Leads Imported', // ✅ Make sure this is a string
      text: `${savedLeads.length} leads were successfully imported.`,
      html: `<p>${savedLeads.length} leads were successfully imported.</p>`,
    };
    await sgMail.send(msg);

    res.json({ message: "Leads imported successfully", leads: savedLeads });
  } catch (error) {
    console.error("❌ Import failed:", error);
    res.status(500).json({ message: "Failed to import leads" });
  }
};

module.exports = { importLeads };
