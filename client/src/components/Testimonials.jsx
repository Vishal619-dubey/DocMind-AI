const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    image: "👨‍💻",
    review:
      "DocMind AI completely changed the way I manage my project documents. AI summaries save me hours every week.",
  },
  {
    name: "Priya Verma",
    role: "UI/UX Designer",
    image: "👩‍🎨",
    review:
      "The interface is beautiful and the AI assistant makes searching documents incredibly easy.",
  },
  {
    name: "Aman Singh",
    role: "Project Manager",
    image: "👨‍💼",
    review:
      "Best cloud document management platform I've used. Fast, secure and very intelligent.",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div className="text-center">

        <h2 className="text-5xl font-bold">
          Loved By <span className="text-indigo-500">Thousands</span>
        </h2>

        <p className="text-gray-400 mt-4">
          Hear what our users say about DocMind AI.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">

        {testimonials.map((user) => (

          <div
            key={user.name}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-indigo-500 transition"
          >

            <div className="text-6xl">
              {user.image}
            </div>

            <p className="text-gray-300 leading-8 mt-6">
              "{user.review}"
            </p>

            <div className="mt-8">

              <h3 className="text-xl font-bold">
                {user.name}
              </h3>

              <p className="text-indigo-400">
                {user.role}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}