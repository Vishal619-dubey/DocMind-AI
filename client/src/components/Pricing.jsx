const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for students",
    features: [
      "5 Documents",
      "Basic AI Summary",
      "100MB Storage",
      "Email Support",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    description: "Best for professionals",
    features: [
      "Unlimited Documents",
      "AI Chat",
      "10GB Storage",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For companies",
    features: [
      "Unlimited Storage",
      "Team Members",
      "Advanced AI",
      "24/7 Support",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div className="text-center">
        <h2 className="text-5xl font-bold">
          Simple <span className="text-indigo-500">Pricing</span>
        </h2>

        <p className="text-gray-400 mt-4">
          Choose the plan that's right for you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">

        {plans.map((plan) => (

          <div
            key={plan.name}
            className={`rounded-3xl p-8 border transition duration-300
            ${
              plan.popular
                ? "border-indigo-500 bg-slate-900 scale-105"
                : "border-slate-800 bg-slate-900 hover:border-indigo-500"
            }`}
          >

            {plan.popular && (
              <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm">
                Most Popular
              </span>
            )}

            <h3 className="text-3xl font-bold mt-5">
              {plan.name}
            </h3>

            <p className="text-indigo-500 text-5xl font-bold mt-4">
              {plan.price}
            </p>

            <p className="text-gray-400 mt-3">
              {plan.description}
            </p>

            <ul className="space-y-4 mt-8">

              {plan.features.map((item) => (

                <li key={item}>
                  ✅ {item}
                </li>

              ))}

            </ul>

            <button className="w-full mt-10 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition">
              Get Started
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}