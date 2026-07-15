import {
  FaCheckCircle,
  FaRobot,
  FaFilePdf,
  FaCloud,
} from "react-icons/fa";

const notifications = [
  {
    icon: <FaFilePdf className="text-red-500" />,
    title: "New PDF Uploaded",
    desc: "Java Programming Lab.pdf",
    time: "2 min ago",
  },
  {
    icon: <FaRobot className="text-indigo-500" />,
    title: "AI Summary Generated",
    desc: "Healthcare.pdf",
    time: "10 min ago",
  },
  {
    icon: <FaCloud className="text-cyan-400" />,
    title: "Storage Updated",
    desc: "420 MB Used",
    time: "20 min ago",
  },
  {
    icon: <FaCheckCircle className="text-green-500" />,
    title: "Quiz Generated",
    desc: "25 Questions Ready",
    time: "1 hour ago",
  },
];

export default function NotificationMenu() {
  return (
    <div className="absolute right-0 mt-4 w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50">

      <div className="p-5 border-b border-slate-800">

        <h2 className="text-xl font-bold">
          Notifications
        </h2>

      </div>

      <div className="max-h-96 overflow-y-auto">

        {notifications.map((item, index) => (

          <div
            key={index}
            className="flex gap-4 p-5 hover:bg-slate-800 cursor-pointer transition"
          >

            <div className="text-2xl">
              {item.icon}
            </div>

            <div className="flex-1">

              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                {item.desc}
              </p>

              <span className="text-xs text-gray-500">
                {item.time}
              </span>

            </div>

          </div>

        ))}

      </div>

      <div className="border-t border-slate-800 p-4">

        <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500">
          View All Notifications
        </button>

      </div>

    </div>
  );
}