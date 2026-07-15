const express = require("express");
const router = express.Router();
const Document = require("../models/Document");

// (TEMP MOCK AI - later OpenAI add karenge)
router.post("/:id", async (req, res) => {
  try {
    const { message } = req.body;

    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Fake AI response (replace later with OpenAI)
    const reply = `🤖 AI Answer based on "${doc.filename}": You asked "${message}"`;

    res.json({
      success: true,
      reply,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;