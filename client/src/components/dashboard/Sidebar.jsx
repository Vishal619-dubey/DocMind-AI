import {
  LayoutDashboard,
  FolderOpen,
  Sparkles,
  BarChart3,
  Star,
  Pin,
  Trash2,
  Settings,
  HardDrive,
  Crown,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "My Files",
    icon: FolderOpen,
    path: "/documents",
  },
  {
    title: "AI Assistant",
    icon: Sparkles,
    path: "/chat",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    title: "Favorites",
    icon: Star,
    path: "/favorites",
  },
  {
    title: "Pinned",
    icon: Pin,
    path: "/pinned",
  },
  {
    title: "Trash",
    icon: Trash2,
    path: "/trash",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-slate-950 border-r border-slate-800 flex flex-col">

      {/* Logo */}

      <div className="px-8 py-8 border-b border-slate-800">

        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xl font-bold">

            AI

          </div>

          <div>

            <h2 className="text-xl font-bold">
              DocMind
            </h2>

            <p className="text-xs text-slate-400">
              AI Workspace
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <div className="flex-1 px-5 py-6">

        <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">

          Workspace

        </p>

        <div className="space-y-2">

          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-900"
                  }`
                }
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>

              </NavLink>
            );
          })}

        </div>

      </div>

      {/* Storage */}

      <div className="p-5">

        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-5">

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-2">

              <HardDrive size={20} />

              <span className="font-semibold">
                Storage
              </span>

            </div>

            <span className="text-sm">
              65%
            </span>

          </div>

          <div className="w-full bg-slate-700 rounded-full h-2 mt-4">

            <div
              className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              style={{ width: "65%" }}
            />

          </div>

          <p className="text-sm text-slate-400 mt-3">

            13 GB of 20 GB Used

          </p>

          <button className="mt-5 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 font-semibold flex justify-center items-center gap-2 hover:scale-105 transition">

            <Crown size={18} />

            Upgrade Pro

          </button>

        </div>

      </div>

    </aside>
  );
}