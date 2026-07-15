import { useState } from "react";
import axios from "axios";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

export default function ChatWithPdf({ documentId }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/chat/${documentId}`,
        {
          question,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: res.data.answer,
        },
      ]);

      setQuestion("");
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Failed to get AI response.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="mt-6 bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4">

        <h2 className="font-bold text-lg flex items-center gap-2">
          <FaRobot />
          AI Chat Assistant
        </h2>

      </div>

      {/* Messages */}

      <div className="h-80 overflow-y-auto p-5 space-y-5">

        {messages.length === 0 && (
          <p className="text-gray-400">
            Ask anything about this PDF...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-indigo-600"
                  : "bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">

                {msg.role === "user" ? (
                  <FaUser />
                ) : (
                  <FaRobot />
                )}

                <span className="font-semibold text-sm">
                  {msg.role === "user"
                    ? "You"
                    : "DocMind AI"}
                </span>

              </div>

              <p className="whitespace-pre-wrap">
                {msg.text}
              </p>

            </div>
          </div>
        ))}

        {loading && (
          <p className="text-indigo-400 animate-pulse">
            🤖 AI is thinking...
          </p>
        )}

      </div>

      {/* Input */}

      <div className="border-t border-slate-700 p-4 flex gap-3">

        <input
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" && askAI()
          }
          placeholder="Ask anything about this PDF..."
          className="flex-1 bg-slate-800 rounded-xl px-4 py-3 outline-none"
        />

        <button
          onClick={askAI}
          className="bg-indigo-600 hover:bg-indigo-500 px-5 rounded-xl flex items-center justify-center"
        >
          <FaPaperPlane />
        </button>

      </div>

    </div>
  );
}