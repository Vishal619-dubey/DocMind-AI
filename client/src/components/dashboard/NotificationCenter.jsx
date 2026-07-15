import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  FileText,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

export default function NotificationCenter() {
  const notifications = [
    {
      title: "AI Summary Ready",
      desc: "Resume.pdf summarized successfully",
      icon: Sparkles,
      color: "text-violet-400",
      time: "2 min ago",
    },
    {
      title: "Upload Complete",
      desc: "Research.pdf uploaded",
      icon: FileText,
      color: "text-cyan-400",
      time: "5 min ago",
    },
    {
      title: "Storage Alert",
      desc: "65% storage used",
      icon: AlertTriangle,
      color: "text-yellow-400",
      time: "20 min ago",
    },
    {
      title: "AI Quiz Generated",
      desc: "12 Questions created",
      icon: CheckCircle2,
      color: "text-green-400",
      time: "35 min ago",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Bell className="text-indigo-400" />
        <h2 className="text-xl font-bold">
          Notifications
        </h2>
      </div>

      <div className="space-y-4">
        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              whileHover={{
                x: 5,
              }}
              key={item.title}
              className="rounded-2xl bg-slate-950 border border-slate-800 p-4"
            >
              <div className="flex gap-4">

                <div className={`${item.color}`}>
                  <Icon size={22} />
                </div>

                <div className="flex-1">

                  <h3 className="font-semibold">

                    {item.title}

                  </h3>

                  <p className="text-slate-400 text-sm mt-1">

                    {item.desc}

                  </p>

                </div>

                <span className="text-xs text-slate-500">

                  {item.time}

                </span>

              </div>

            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}