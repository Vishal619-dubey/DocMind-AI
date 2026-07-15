import { Search, Upload, Grid2X2, List } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

      {/* Search */}

      <div className="relative flex-1 max-w-2xl">

        <Search
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search documents, summaries, AI chats..."
          className="w-full rounded-2xl border border-slate-800 bg-slate-900 py-4 pl-14 pr-5 outline-none focus:border-indigo-500 transition"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        <button className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-indigo-500 transition">

          <Grid2X2 size={18} />

        </button>

        <button className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-indigo-500 transition">

          <List size={18} />

        </button>

        <button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold hover:scale-105 transition flex items-center gap-2">

          <Upload size={18} />

          Upload

        </button>

      </div>

    </div>
  );
}