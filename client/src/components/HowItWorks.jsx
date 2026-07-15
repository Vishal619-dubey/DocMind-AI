const steps = [
  {
    number: "01",
    title: "Upload Document",
    desc: "Upload PDF, DOCX, PPT, or images securely to your cloud workspace.",
    icon: "📤",
  },
  {
    number: "02",
    title: "AI Processing",
    desc: "Gemini AI analyzes your document, extracts text, and generates insights.",
    icon: "🤖",
  },
  {
    number: "03",
    title: "Chat & Manage",
    desc: "Ask questions, summarize content, organize files, and access them anytime.",
    icon: "💬",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold">
          How <span className="text-indigo-500">DocMind AI</span> Works
        </h2>

        <p className="text-gray-400 mt-4">
          Three simple steps to manage your documents with AI.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500 transition duration-300"
          >
            <div className="text-5xl">{step.icon}</div>

            <div className="text-indigo-500 font-bold text-xl mt-6">
              {step.number}
            </div>

            <h3 className="text-2xl font-semibold mt-3">
              {step.title}
            </h3>

            <p className="text-gray-400 mt-4 leading-7">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}