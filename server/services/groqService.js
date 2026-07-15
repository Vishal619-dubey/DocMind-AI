const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/* =====================================================
   Generate AI Summary
===================================================== */

async function generateSummary(text) {
  try {
    if (!text || text.trim() === "") {
      throw new Error("No text provided for summary.");
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are an expert AI assistant.

Summarize documents in:

• Bullet Points
• Simple English
• Important Topics
• Key Takeaways
• Maximum 250 words

Never hallucinate.
`,
        },
        {
          role: "user",
          content: text.substring(0, 12000),
        },
      ],

      temperature: 0.3,
      max_tokens: 700,
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("Groq Summary Error:", err.message);
    throw err;
  }
}

/* =====================================================
   Chat with PDF
===================================================== */

async function chatWithPdf(pdfContent, question) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are DocMind AI.

Rules:

1. Answer ONLY using the uploaded PDF.
2. Never make up information.
3. If answer doesn't exist, say:

"This information is not available in the uploaded PDF."

4. Explain in simple language.
5. Give short but useful answers.
`,
        },

        {
          role: "user",
          content: `
PDF:

${pdfContent.substring(0, 12000)}

------------------------

Question:

${question}
`,
        },
      ],

      temperature: 0.2,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("Groq Chat Error:", err.message);
    throw err;
  }
}

/* =====================================================
   Generate Quiz
===================================================== */

async function generateQuiz(text) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
Generate 10 MCQs.

Return ONLY JSON.

Example:

[
 {
   "question":"",
   "options":["","","",""],
   "answer":""
 }
]
`,
        },

        {
          role: "user",
          content: text.substring(0, 12000),
        },
      ],

      temperature: 0.4,
      max_tokens: 1500,
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("Groq Quiz Error:", err.message);
    throw err;
  }
}

/* =====================================================
   Flashcards
===================================================== */

async function generateFlashcards(text) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
Generate flashcards.

Return JSON only.

Example:

[
 {
   "front":"What is AI?",
   "back":"Artificial Intelligence"
 }
]
`,
        },

        {
          role: "user",
          content: text.substring(0, 12000),
        },
      ],

      temperature: 0.3,
      max_tokens: 1500,
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("Groq Flashcard Error:", err.message);
    throw err;
  }
}

/* =====================================================
   Export
===================================================== */

module.exports = {
  generateSummary,
  chatWithPdf,
  generateQuiz,
  generateFlashcards,
};