import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  FileText,
  BookOpen,
  Database,
  ArrowRight,
} from "lucide-react";

export default function AISuggestions() {
  const suggestions = [
    {
      icon: FileText,
      title: "Generate Summary",
      desc: "Resume.pdf is ready for AI summarization.",
      color: "text-indigo-400",
    },
    {
      icon: Brain,
      title: "Create Quiz",
      desc: "Generate 15 MCQs from AI Research.pdf.",
      color: "text-pink-400",
    },
    {
      icon: BookOpen,
      title: "Create Flashcards",
      desc: "Flashcards can be generated in one click.",
      color: "text-cyan-400",
    },
    {
      icon: Database,
      title: "Optimize Storage",
      desc: "Duplicate files detected. Save 2.3 GB.",
      color: "text-green-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-indigo-400" />
        <h2 className="text-2xl font-bold">
          Smart AI Suggestions
        </h2>
      </div>

      <div className="space-y-4">
        {suggestions.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              whileHover={{ x: 5 }}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-4 flex justify-between items-center"
            >
              <div className="flex gap-4 items-start">

                <div className={item.color}>
                  <Icon size={22} />
                </div>

                <div>

                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-sm mt-1">
                    {item.desc}
                  </p>

                </div>

              </div>

              <button className="rounded-xl bg-indigo-600 px-4 py-2 hover:bg-indigo-500 transition flex items-center gap-2">

                Open

                <ArrowRight size={16} />

              </button>

            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}