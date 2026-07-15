const features = [
  {
    title: "AI Document Summary",
    desc: "Generate concise summaries from PDFs and documents in seconds.",
    icon: "🤖",
  },
  {
    title: "Cloud Storage",
    desc: "Securely store and access your files from anywhere.",
    icon: "☁️",
  },
  {
    title: "Chat with Documents",
    desc: "Ask questions directly from your uploaded files using AI.",
    icon: "💬",
  },
  {
    title: "OCR Support",
    desc: "Extract text from scanned documents and images.",
    icon: "📄",
  },
  {
    title: "Analytics",
    desc: "Track uploads, summaries, and storage usage.",
    icon: "📊",
  },
  {
    title: "Secure Access",
    desc: "JWT authentication with encrypted document storage.",
    icon: "🔒",
  },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-4xl font-bold text-center">
        Powerful AI Features
      </h2>

      <p className="text-center text-gray-400 mt-4">
        Everything you need to manage documents intelligently.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500 transition"
          >
            <div className="text-5xl">{item.icon}</div>

            <h3 className="text-xl font-semibold mt-6">
              {item.title}
            </h3>

            <p className="text-gray-400 mt-3">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}