const faqs = [
  {
    question: "Is my data secure?",
    answer:
      "Yes. All your documents are securely stored and encrypted in the cloud.",
  },
  {
    question: "Which file formats are supported?",
    answer:
      "PDF, DOCX, PPTX, TXT, PNG, JPG and many more formats are supported.",
  },
  {
    question: "Can I chat with my documents?",
    answer:
      "Yes. Our AI lets you ask questions and get answers directly from your uploaded files.",
  },
  {
    question: "Do you offer team plans?",
    answer:
      "Yes. Enterprise plans include collaboration, shared workspaces and advanced analytics.",
  },
];

export default function FAQ() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">

      <div className="text-center">
        <h2 className="text-5xl font-bold">
          Frequently Asked <span className="text-indigo-500">Questions</span>
        </h2>

        <p className="text-gray-400 mt-4">
          Everything you need to know about DocMind AI.
        </p>
      </div>

      <div className="mt-16 space-y-6">

        {faqs.map((faq) => (

          <div
            key={faq.question}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500 transition"
          >

            <h3 className="text-xl font-semibold">
              {faq.question}
            </h3>

            <p className="text-gray-400 mt-3 leading-7">
              {faq.answer}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}