const express = require("express");
const router = express.Router();

const Document = require("../models/Document");
const { generateSummary } = require("../services/groqService");

/*
======================================================
Generate AI Summary
POST /api/summary/:id
======================================================
*/

router.post("/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (!document.content || document.content.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "PDF content not found.",
      });
    }

    const summary = await generateSummary(document.content);

    document.summary = summary;

    await document.save();

    res.json({
      success: true,
      summary,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/*
======================================================
Get Summary
GET /api/summary/:id
======================================================
*/

router.get("/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.json({
      success: true,
      summary: document.summary,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;