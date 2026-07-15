import { motion } from "framer-motion";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center justify-between gap-12">

      {/* Left Content */}
      <motion.div
        className="max-w-xl"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-medium">
          🚀 AI Powered Cloud Platform
        </span>

        <h1 className="mt-6 text-5xl lg:text-6xl font-bold leading-tight">
          Manage Your
          <span className="text-indigo-500"> Documents </span>
          Smarter with AI
        </h1>

        <p className="mt-6 text-gray-400 text-lg leading-8">
          Upload, organize, summarize and chat with your PDF, DOCX and other
          files using AI. Secure cloud storage with a modern dashboard.
        </p>

        <div className="mt-10 flex gap-4 flex-wrap">
          <Button>Get Started</Button>

          <button className="px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition">
            Watch Demo
          </button>
        </div>
      </motion.div>

      {/* Right Dashboard Preview */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Dashboard</h3>

            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
              Online
            </span>
          </div>

          <div className="space-y-4">

            <div className="rounded-xl bg-slate-800 p-4">
              📄 AI Research.pdf
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              📑 Resume.docx
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              📊 Report.pptx
            </div>

            <div className="rounded-xl bg-indigo-600 p-4 font-semibold">
              🤖 AI Summary Ready
            </div>

          </div>
        </div>
      </motion.div>

    </section>
  );
}