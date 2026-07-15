import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    day: "Mon",
    uploads: 2,
  },
  {
    day: "Tue",
    uploads: 5,
  },
  {
    day: "Wed",
    uploads: 3,
  },
  {
    day: "Thu",
    uploads: 8,
  },
  {
    day: "Fri",
    uploads: 6,
  },
  {
    day: "Sat",
    uploads: 10,
  },
  {
    day: "Sun",
    uploads: 7,
  },
];

export default function AnalyticsCharts() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold">

            Analytics Overview

          </h2>

          <p className="text-slate-400">

            Weekly document uploads

          </p>

        </div>

        <span className="px-3 py-1 rounded-full bg-indigo-600 text-sm">

          Live

        </span>

      </div>

      <div className="h-72">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="colorUpload"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#6366f1"
                  stopOpacity={0.9}
                />

                <stop
                  offset="100%"
                  stopColor="#6366f1"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="uploads"
              stroke="#6366f1"
              fill="url(#colorUpload)"
              strokeWidth={3}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}