import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  HardDrive,
  Activity,
  TrendingUp,
} from "lucide-react";

export default function StatsCards() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get("https://docmind-ai-gmxl.onrender.com/api/documents");
      setDocuments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalDocuments = documents.length;

  const totalSummary = documents.filter(
    (doc) => doc.summary
  ).length;

  const storage = (
    documents.reduce(
      (sum, doc) => sum + doc.filesize,
      0
    ) /
    1024 /
    1024
  ).toFixed(2);

  const aiUsage = Math.min(totalSummary * 5, 100);

  const cards = [
    {
      title: "Documents",
      value: totalDocuments,
      icon: FileText,
      color: "from-indigo-500 to-violet-600",
      trend: "+12%",
      progress: Math.min(totalDocuments, 100),
    },
    {
      title: "AI Summaries",
      value: totalSummary,
      icon: Sparkles,
      color: "from-pink-500 to-purple-600",
      trend: "+8%",
      progress: Math.min(totalSummary, 100),
    },
    {
      title: "Storage",
      value: `${storage} MB`,
      icon: HardDrive,
      color: "from-cyan-500 to-blue-600",
      trend: "65%",
      progress: Math.min((storage / 20) * 100, 100),
    },
    {
      title: "AI Usage",
      value: `${aiUsage}%`,
      icon: Activity,
      color: "from-emerald-500 to-green-600",
      trend: "+18%",
      progress: aiUsage,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-6 shadow-lg"
          >
            {/* Glow */}

            <div
              className={`absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-r ${card.color} opacity-20 blur-3xl`}
            />

            {/* Top */}

            <div className="relative flex items-center justify-between">

              <div
                className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg`}
              >
                <Icon size={26} />
              </div>

              <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">

                <TrendingUp size={14} />

                {card.trend}

              </div>

            </div>

            {/* Content */}

            <div className="relative mt-6">

              <p className="text-slate-400 text-sm">

                {card.title}

              </p>

              <h2 className="mt-2 text-4xl font-bold">

                {card.value}

              </h2>

            </div>

            {/* Progress */}

            <div className="mt-6">

              <div className="h-2 w-full rounded-full bg-slate-800">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${card.progress}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className={`h-2 rounded-full bg-gradient-to-r ${card.color}`}
                />

              </div>

            </div>

          </motion.div>
        );
      })}

    </div>
  );
}