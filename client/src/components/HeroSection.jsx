import {
  Sparkles,
  Upload,
  Bot,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-10">

      {/* Glow */}

      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col xl:flex-row justify-between gap-10">

        {/* Left */}

        <div className="max-w-3xl">

          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">

            <Sparkles size={16} />

            AI Powered Workspace

          </div>

          <h1 className="mt-6 text-5xl font-bold leading-tight">

            Welcome Back 👋

            <br />

            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">

              Vishal

            </span>

          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-400">

            Upload, organize, summarize and chat with your documents using AI.
            Everything stays in one intelligent workspace.

          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold transition hover:scale-105">

              Upload Document

            </button>

            <button className="flex items-center gap-2 rounded-2xl border border-slate-700 px-6 py-3 transition hover:bg-slate-800">

              Ask AI

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-5 xl:w-[430px]">

          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 backdrop-blur">

            <FileText
              size={32}
              className="text-indigo-400"
            />

            <p className="mt-5 text-sm text-slate-400">

              Documents

            </p>

            <h2 className="mt-2 text-4xl font-bold">

              03

            </h2>

          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 backdrop-blur">

            <Bot
              size={32}
              className="text-pink-400"
            />

            <p className="mt-5 text-sm text-slate-400">

              AI Chats

            </p>

            <h2 className="mt-2 text-4xl font-bold">

              18

            </h2>

          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 backdrop-blur">

            <Upload
              size={32}
              className="text-cyan-400"
            />

            <p className="mt-5 text-sm text-slate-400">

              Uploads

            </p>

            <h2 className="mt-2 text-4xl font-bold">

              12

            </h2>

          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 backdrop-blur">

            <Sparkles
              size={32}
              className="text-green-400"
            />

            <p className="mt-5 text-sm text-slate-400">

              AI Summaries

            </p>

            <h2 className="mt-2 text-4xl font-bold">

              09

            </h2>

          </div>

        </div>

      </div>

    </section>
  );
}