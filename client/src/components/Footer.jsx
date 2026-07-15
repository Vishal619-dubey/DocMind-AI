import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">

      {/* CTA */}

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 rounded-3xl p-12 text-center shadow-2xl">

          <h2 className="text-5xl font-bold">
            Ready to Supercharge Your Documents?
          </h2>

          <p className="mt-5 text-lg text-indigo-100 max-w-2xl mx-auto">
            Upload, organize, summarize and chat with your documents using powerful AI.
          </p>

          <button className="mt-8 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition duration-300">
            Get Started Free
          </button>

        </div>

      </div>

      {/* Footer Content */}

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-12">

        {/* Brand */}

        <div>

          <h2 className="text-3xl font-bold">
            <span className="text-indigo-500">Doc</span>Mind AI
          </h2>

          <p className="text-gray-400 mt-4 leading-7">
            AI powered cloud document management platform built for students,
            developers and businesses.
          </p>

          <p className="text-gray-500 mt-6">
            📧 Vishal1279@gmail.com
          </p>

        </div>

        {/* Product */}

        <div>

          <h3 className="font-bold text-xl mb-4">
            Product
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li className="hover:text-white cursor-pointer transition">
              Features
            </li>

            <li className="hover:text-white cursor-pointer transition">
              Pricing
            </li>

            <li className="hover:text-white cursor-pointer transition">
              Dashboard
            </li>

            <li className="hover:text-white cursor-pointer transition">
              AI Chat
            </li>

          </ul>

        </div>

        {/* Resources */}

        <div>

          <h3 className="font-bold text-xl mb-4">
            Resources
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li className="hover:text-white cursor-pointer transition">
              Documentation
            </li>

            <li className="hover:text-white cursor-pointer transition">
              API
            </li>

            <li className="hover:text-white cursor-pointer transition">
              Support
            </li>

            <li className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </li>

          </ul>

        </div>

        {/* Connect */}

        <div>

          <h3 className="font-bold text-xl mb-4">
            Connect
          </h3>

          <div className="flex gap-5 text-3xl">

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-500 transition duration-300"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition duration-300"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition duration-300"
            >
              <FaInstagram />
            </a>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-800 py-6 text-center text-gray-500">

        © 2026 DocMind AI. All Rights Reserved.

      </div>

    </footer>
  );
}