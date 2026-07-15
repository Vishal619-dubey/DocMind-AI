import { motion } from "framer-motion";
import {
  ShieldCheck,
  Brain,
  HardDrive,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function WorkspaceHealth() {

  const stats = [
    {
      title: "AI Efficiency",
      value: "98%",
      color: "bg-indigo-500",
    },
    {
      title: "Storage Health",
      value: "89%",
      color: "bg-cyan-500",
    },
    {
      title: "Security",
      value: "100%",
      color: "bg-green-500",
    },
    {
      title: "Performance",
      value: "95%",
      color: "bg-pink-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-6 shadow-xl"
    >

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">

            <ShieldCheck className="text-green-400" />

            Workspace Health

          </h2>

          <p className="text-slate-400 mt-2">

            AI monitors your workspace in real-time

          </p>

        </div>

        <div className="text-5xl font-bold text-green-400">

          95%

        </div>

      </div>

      {/* Health Stats */}

      <div className="mt-8 space-y-5">

        {stats.map((item) => (

          <div key={item.title}>

            <div className="flex justify-between mb-2">

              <span>

                {item.title}

              </span>

              <span className="font-semibold">

                {item.value}

              </span>

            </div>

            <div className="h-2 rounded-full bg-slate-800">

              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: item.value,
                }}
                transition={{
                  duration: 1,
                }}
                className={`h-2 rounded-full ${item.color}`}
              />

            </div>

          </div>

        ))}

      </div>

      {/* Recommendation */}

      <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

        <div className="flex items-center gap-3">

          <Brain className="text-green-400" />

          <h3 className="font-semibold">

            AI Recommendation

          </h3>

        </div>

        <p className="text-slate-300 mt-3 leading-7">

          Workspace performance is excellent.

          AI recommends deleting duplicate documents

          to improve storage efficiency.

        </p>

      </div>

      {/* Footer */}

      <div className="mt-8 grid grid-cols-3 gap-4">

        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 text-center">

          <HardDrive className="mx-auto text-cyan-400" />

          <p className="mt-2 text-sm">

            Healthy

          </p>

        </div>

        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 text-center">

          <Zap className="mx-auto text-yellow-400" />

          <p className="mt-2 text-sm">

            Fast

          </p>

        </div>

        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 text-center">

          <CheckCircle2 className="mx-auto text-green-400" />

          <p className="mt-2 text-sm">

            Secure

          </p>

        </div>

      </div>

    </motion.div>
  );
}