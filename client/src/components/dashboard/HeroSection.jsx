import {
  Sparkles,
  Upload,
  MessageSquare,
  FileText,
  Brain,
  HardDrive,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-8">

      {/* Background Glow */}

      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT */}

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-indigo-300">

            <Sparkles size={18} />

            AI Powered Workspace

          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight">

            Manage Documents

            <br />

            with

            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">

              {" "}AI

            </span>

          </h1>

          <p className="mt-6 max-w-xl text-slate-400 leading-8">

            Upload documents, generate AI summaries,
            create quizzes, flashcards and chat with your
            PDFs — all from one intelligent dashboard.

          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 font-semibold hover:scale-105 transition">

              <div className="flex items-center gap-2">

                <Upload size={20} />

                Upload Document

              </div>

            </button>

            <button className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 hover:border-indigo-500 transition">

              <div className="flex items-center gap-2">

                <MessageSquare size={20} />

                AI Chat

              </div>

            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="grid grid-cols-2 gap-5">

          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6">

            <FileText className="text-indigo-400" />

            <h3 className="mt-5 text-4xl font-bold">

              128

            </h3>

            <p className="mt-2 text-slate-400">

              Documents

            </p>

          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6">

            <Brain className="text-pink-400" />

            <h3 className="mt-5 text-4xl font-bold">

              87

            </h3>

            <p className="mt-2 text-slate-400">

              AI Summaries

            </p>

          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6">

            <Sparkles className="text-cyan-400" />

            <h3 className="mt-5 text-4xl font-bold">

              99%

            </h3>

            <p className="mt-2 text-slate-400">

              AI Accuracy

            </p>

          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6">

            <HardDrive className="text-green-400" />

            <h3 className="mt-5 text-4xl font-bold">

              13GB

            </h3>

            <p className="mt-2 text-slate-400">

              Storage Used

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}