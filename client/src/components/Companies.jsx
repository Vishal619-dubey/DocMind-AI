const companies = [
  "Google",
  "Microsoft",
  "OpenAI",
  "Amazon",
  "Adobe",
  "Notion",
];

export default function Companies() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <p className="text-center text-gray-400 uppercase tracking-widest">
        Trusted by Teams Worldwide
      </p>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {companies.map((company) => (
          <div
            key={company}
            className="bg-slate-900 border border-slate-800 rounded-xl py-5 text-center hover:border-indigo-500 transition"
          >
            <h3 className="font-semibold text-lg">{company}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}