const fs = require("fs");
const pdfParse = require("pdf-parse");

const Document = require("../models/Document");
const { generateSummary } = require("../services/groqService");

const generatePdfSummary = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    // Read PDF
    const buffer = fs.readFileSync(document.filepath);

    // Extract text
    const data = await pdfParse(buffer);

    // Save full PDF content for Chat AI
    document.content = data.text;

    // Limit text size for AI Summary
    let text = data.text || "";

    if (text.length > 8000) {
      text = text.substring(0, 8000);
    }

    // Generate AI Summary
    const summary = await generateSummary(text);

    // Save summary
    document.summary = summary;

    await document.save();

    res.status(200).json({
      success: true,
      message: "Summary generated successfully",
      summary,
    });
  } catch (error) {
    console.error("Summary Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generatePdfSummary,
};