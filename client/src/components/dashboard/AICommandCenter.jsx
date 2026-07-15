import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  MessageSquare,
  FileText,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function AICommandCenter() {
  const actions = [
    {
      title: "Summarize PDF",
      icon: FileText,
      color: "from-indigo-500 to-violet-600",
    },
    {
      title: "Generate Quiz",
      icon: Brain,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Create Flashcards",
      icon: BookOpen,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Ask AI",
      icon: MessageSquare,
      color: "from-emerald-500 to-green-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-7 shadow-xl"
    >
      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-3">

            <Sparkles className="text-indigo-400" />

            AI Command Center

          </h2>

          <p className="text-slate-400 mt-2">

            Your intelligent workspace assistant

          </p>

        </div>

        <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">

          ● Online

        </div>

      </div>

      {/* Today's Activity */}

      <div className="mt-8 rounded-2xl bg-slate-950 border border-slate-800 p-5">

        <h3 className="font-semibold mb-4">

          Today's AI Activity

        </h3>

        <div className="space-y-3">

          {[
            "3 AI Summaries Generated",
            "2 Documents Uploaded",
            "5 AI Questions Answered",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3"
            >
              <CheckCircle2
                size={18}
                className="text-green-400"
              />

              <span className="text-slate-300">

                {item}

              </span>

            </div>
          ))}

        </div>

      </div>

      {/* Quick Actions */}

      <div className="mt-8">

        <h3 className="font-semibold mb-4">

          Quick Actions

        </h3>

        <div className="grid grid-cols-2 gap-4">

          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <motion.button
                whileHover={{
                  y: -5,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                key={action.title}
                className={`rounded-2xl bg-gradient-to-r ${action.color} p-5 text-left shadow-lg`}
              >
                <Icon size={28} />

                <h3 className="mt-4 font-semibold">

                  {action.title}

                </h3>

              </motion.button>
            );
          })}

        </div>

      </div>

      {/* Footer */}

      <button className="mt-8 w-full rounded-2xl border border-indigo-500 py-4 flex items-center justify-center gap-3 hover:bg-indigo-600 transition">

        Open AI Workspace

        <ArrowRight size={18} />

      </button>

    </motion.div>
  );
}