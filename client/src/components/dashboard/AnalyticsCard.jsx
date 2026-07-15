import { useEffect, useState } from "react";
import axios from "axios";
import { FaChartBar } from "react-icons/fa";

export default function AnalyticsCard() {
  const [data, setData] = useState({
    total: 0,
    summaries: 0,
    pending: 0,
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/documents"
      );

      const docs = res.data;

      const total = docs.length;

      const summaries = docs.filter(
        (d) => d.summary && d.summary.trim() !== ""
      ).length;

      const pending = total - summaries;

      setData({
        total,
        summaries,
        pending,
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="flex items-center gap-3">

        <FaChartBar className="text-2xl text-green-500" />

        <h2 className="text-2xl font-bold">
          Analytics Overview
        </h2>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-slate-800 rounded-xl p-5">

          <h3 className="text-gray-400">
            Uploaded PDFs
          </h3>

          <p className="text-4xl font-bold mt-2">
            {data.total}
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-5">

          <h3 className="text-gray-400">
            AI Summaries
          </h3>

          <p className="text-4xl font-bold mt-2 text-green-400">
            {data.summaries}
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-5">

          <h3 className="text-gray-400">
            Pending Summary
          </h3>

          <p className="text-4xl font-bold mt-2 text-yellow-400">
            {data.pending}
          </p>

        </div>

      </div>

    </div>
  );
}