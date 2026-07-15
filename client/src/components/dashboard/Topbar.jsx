import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  Search,
  Sparkles,
  Sun,
  Moon,
  UserCircle2,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export default function Topbar() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [search, setSearch] = useState("");

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setShowProfile(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotification(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/70 border-b border-slate-800">

      <div className="h-20 px-8 flex items-center justify-between">

        {/* Left */}

        <div>

          <h2 className="text-2xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Here's what's happening today.
          </p>

        </div>

        {/* Search */}

        <div className="relative w-[420px]">

          <Search
            size={18}
            className="absolute left-4 top-4 text-slate-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search documents..."
            className="w-full rounded-2xl border border-slate-800 bg-slate-900 py-3 pl-12 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* AI PRO */}

          <button className="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-5 py-3 flex items-center gap-2 font-semibold shadow-lg shadow-indigo-500/30 hover:scale-105 transition">

            <Sparkles size={18} />

            AI PRO

          </button>

          {/* Theme */}

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-slate-800 transition flex items-center justify-center"
          >

            {darkMode ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}

          </button>
                    {/* Notification */}

          <div
            className="relative"
            ref={notificationRef}
          >

            <button
              onClick={() =>
                setShowNotification(!showNotification)
              }
              className="relative h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-slate-800 transition flex items-center justify-center"
            >

              <Bell size={20} />

              <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
                3
              </span>

            </button>

            {showNotification && (

              <div className="absolute right-0 mt-4 w-80 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-5">

                <h3 className="font-bold text-lg mb-4">
                  Notifications
                </h3>

                <div className="space-y-4">

                  <div className="border-b border-slate-700 pb-3">
                    🤖 AI Summary Ready
                  </div>

                  <div className="border-b border-slate-700 pb-3">
                    📄 Upload Completed
                  </div>

                  <div className="border-b border-slate-700 pb-3">
                    ⚠ Storage 65% Used
                  </div>

                </div>

              </div>

            )}

          </div>

          {/* Profile */}

          <div
            className="relative"
            ref={profileRef}
          >

            <button
              onClick={() =>
                setShowProfile(!showProfile)
              }
              className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-3 py-2 hover:border-indigo-500 transition"
            >

              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center">

                <UserCircle2 size={28} />

              </div>

              <div className="text-left">

                <h3 className="font-semibold">
                  Vishal Dubey
                </h3>

                <p className="text-xs text-slate-400">
                  Premium User
                </p>

              </div>

              <ChevronDown size={18} />

            </button>

            {showProfile && (

              <div className="absolute right-0 mt-4 w-64 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">

                <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-800 transition">

                  <User size={18} />

                  Profile

                </button>

                <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-800 transition">

                  <Settings size={18} />

                  Settings

                </button>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-5 py-4 text-red-400 hover:bg-red-500/10 transition"
                >

                  <LogOut size={18} />

                  Logout

                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>
  );
}