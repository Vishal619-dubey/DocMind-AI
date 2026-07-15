const Document = require("../models/Document");
const { generateSummary } = require("../services/groqService");

const chatWithPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const { question } = req.body;

    const document = await Document.findById(id);

    console.log("Document Found:", document);
    console.log("Content Length:", document?.content?.length);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (!document.content || document.content.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "PDF content not found. Please generate summary again.",
      });
    }

    // ===== Reduce token usage =====
    let pdfContent = document.content;

    // Try to find the question inside the PDF
    const index = pdfContent
      .toLowerCase()
      .indexOf(question.toLowerCase());

    if (index !== -1) {
      // Send only nearby text
      pdfContent = pdfContent.substring(
        Math.max(0, index - 2500),
        index + 4500
      );
    } else {
      // Otherwise send only first 7000 characters
      pdfContent = pdfContent.substring(0, 7000);
    }

    const prompt = `
You are an AI assistant.

Answer ONLY using the PDF content below.

If the answer is not available, reply exactly:

"This information is not available in the uploaded PDF."

PDF Content:
${pdfContent}

Question:
${question}
`;

    const answer = await generateSummary(prompt);

    res.status(200).json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error("Chat Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  chatWithPdf,
};