import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  HardDrive,
  Crown,
  Sparkles,
  FileText,
  Image,
  Video,
} from "lucide-react";

export default function StorageCard() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(
        "https://docmind-ai-gmxl.onrender.com/api/documents"
      );

      setDocuments(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const TOTAL_STORAGE = 1024; // MB

  const usedStorage =
    documents.reduce(
      (sum, doc) => sum + doc.filesize,
      0
    ) /
    1024 /
    1024;

  const percentage = Math.min(
    (usedStorage / TOTAL_STORAGE) * 100,
    100
  );

  const remaining = (
    TOTAL_STORAGE - usedStorage
  ).toFixed(2);

  // Dummy Breakdown
  const fileTypes = [
    {
      name: "PDF",
      value: 55,
      icon: FileText,
      color: "bg-indigo-500",
    },
    {
      name: "Images",
      value: 22,
      icon: Image,
      color: "bg-pink-500",
    },
    {
      name: "Videos",
      value: 13,
      icon: Video,
      color: "bg-cyan-500",
    },
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-6 shadow-xl"
    >

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">

            Storage

          </h2>

          <p className="text-slate-400 text-sm mt-1">

            Cloud Workspace

          </p>

        </div>

        <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">

          <HardDrive size={28} />

        </div>

      </div>

      {/* Circle */}

      <div className="flex justify-center mt-8">

        <div className="relative h-40 w-40">

          <svg
            className="-rotate-90"
            width="160"
            height="160"
          >

            <circle
              cx="80"
              cy="80"
              r="65"
              stroke="#1e293b"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="80"
              cy="80"
              r="65"
              stroke="url(#grad)"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={408}
              strokeDashoffset={
                408 -
                (408 * percentage) / 100
              }
            />

            <defs>

              <linearGradient
                id="grad"
              >
                <stop
                  offset="0%"
                  stopColor="#6366f1"
                />

                <stop
                  offset="100%"
                  stopColor="#a855f7"
                />

              </linearGradient>

            </defs>

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h2 className="text-3xl font-bold">

              {percentage.toFixed(0)}%

            </h2>

            <span className="text-sm text-slate-400">

              Used

            </span>

          </div>

        </div>

      </div>

      <div className="mt-5 flex justify-between text-sm text-slate-400">

        <span>

          {usedStorage.toFixed(2)} MB Used

        </span>

        <span>

          {remaining} MB Left

        </span>

      </div>
            {/* File Breakdown */}

      <div className="mt-8 space-y-4">

        <h3 className="font-semibold text-lg">

          Storage Breakdown

        </h3>

        {fileTypes.map((item) => {
          const Icon = item.icon;

          return (

            <div key={item.name}>

              <div className="flex justify-between items-center mb-2">

                <div className="flex items-center gap-3">

                  <div className={`h-9 w-9 rounded-xl ${item.color} flex items-center justify-center`}>

                    <Icon size={18} />

                  </div>

                  <span>

                    {item.name}

                  </span>

                </div>

                <span className="text-slate-400">

                  {item.value}%

                </span>

              </div>

              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${item.value}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className={`h-full ${item.color}`}
                />

              </div>

            </div>

          );
        })}

      </div>

      {/* AI Recommendation */}

      <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5">

        <div className="flex items-center gap-3">

          <Sparkles className="text-indigo-400" />

          <h3 className="font-semibold">

            AI Recommendation

          </h3>

        </div>

        <p className="text-slate-400 text-sm mt-3 leading-6">

          Your storage usage is healthy.
          Remove duplicate files and unused media
          to save approximately <span className="text-indigo-400 font-semibold">2.3 GB</span>.

        </p>

      </div>

      {/* Upgrade */}

      <motion.button
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.97,
        }}
        className="mt-8 w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 py-4 font-semibold flex items-center justify-center gap-3 shadow-lg"
      >

        <Crown size={20} />

        Upgrade to Pro

      </motion.button>

    </motion.div>
  );
}