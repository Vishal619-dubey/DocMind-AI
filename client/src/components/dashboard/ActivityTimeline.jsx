import { motion } from "framer-motion";
import {
  Upload,
  Sparkles,
  Brain,
  Download,
  Pin,
  Clock,
} from "lucide-react";

export default function ActivityTimeline() {
  const activities = [
    {
      title: "Uploaded Research.pdf",
      time: "09:20 AM",
      icon: Upload,
      color: "text-cyan-400",
    },
    {
      title: "AI Summary Generated",
      time: "09:25 AM",
      icon: Sparkles,
      color: "text-violet-400",
    },
    {
      title: "Quiz Created",
      time: "09:32 AM",
      icon: Brain,
      color: "text-pink-400",
    },
    {
      title: "Document Downloaded",
      time: "10:15 AM",
      icon: Download,
      color: "text-green-400",
    },
    {
      title: "Pinned Resume.pdf",
      time: "11:05 AM",
      icon: Pin,
      color: "text-yellow-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">

        <Clock className="text-indigo-400" />

        <h2 className="text-xl font-bold">

          Activity Timeline

        </h2>

      </div>

      <div className="relative">

        <div className="absolute left-5 top-2 bottom-2 w-[2px] bg-slate-700" />

        <div className="space-y-6">

          {activities.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                whileHover={{ x: 6 }}
                key={item.title}
                className="relative flex gap-4"
              >
                <div
                  className={`h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center ${item.color} z-10`}
                >
                  <Icon size={18} />
                </div>

                <div className="flex-1 rounded-2xl bg-slate-950 border border-slate-800 p-4">

                  <h3 className="font-semibold">

                    {item.title}

                  </h3>

                  <p className="text-sm text-slate-400 mt-1">

                    {item.time}

                  </p>

                </div>
              </motion.div>
            );
          })}

        </div>

      </div>

    </motion.div>
  );
}