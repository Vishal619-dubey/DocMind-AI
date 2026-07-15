import {
  FaUser,
  FaCreditCard,
  FaCrown,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function ProfileMenu() {
  return (
    <div className="absolute right-0 mt-4 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50">

      <div className="p-5 border-b border-slate-800">

        <h2 className="font-bold text-lg">
          Vishal Dubey
        </h2>

        <p className="text-sm text-gray-400">
          Free Plan
        </p>

      </div>

      <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-800 transition">
        <FaUser />
        My Profile
      </button>

      <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-800 transition">
        <FaCreditCard />
        Billing
      </button>

      <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-800 transition">
        <FaCrown />
        Upgrade Plan
      </button>

      <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-800 transition">
        <FaCog />
        Settings
      </button>

      <div className="border-t border-slate-800">

        <button className="w-full flex items-center gap-3 px-5 py-4 text-red-400 hover:bg-red-500 hover:text-white transition rounded-b-2xl">
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
}