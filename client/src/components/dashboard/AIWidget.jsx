import { FaRobot, FaPaperPlane } from "react-icons/fa";

export default function AIWidget() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">

      <div className="flex items-center gap-3 mb-6">
        <FaRobot className="text-3xl text-indigo-500" />
        <h2 className="text-2xl font-bold">
          AI Assistant
        </h2>
      </div>

      <p className="text-gray-400 mb-6">
        Ask anything about your uploaded documents.
      </p>

      <input
        type="text"
        placeholder="Type your question..."
        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-indigo-500"
      />

      <button className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 transition rounded-xl py-3 flex justify-center items-center gap-3 font-semibold">
        <FaPaperPlane />
        Send
      </button>

      <div className="mt-8">

        <h3 className="font-semibold mb-3">
          Suggestions
        </h3>

        <div className="space-y-3">

          <button className="w-full text-left bg-slate-800 rounded-lg p-3 hover:bg-slate-700 transition">
            📄 Summarize AI Research.pdf
          </button>

          <button className="w-full text-left bg-slate-800 rounded-lg p-3 hover:bg-slate-700 transition">
            💼 Find Resume Skills
          </button>

          <button className="w-full text-left bg-slate-800 rounded-lg p-3 hover:bg-slate-700 transition">
            ☁️ Explain Cloud Computing
          </button>

        </div>

      </div>

    </div>
  );
}