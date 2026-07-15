import { FaSearch, FaThLarge, FaList } from "react-icons/fa";

export default function DocumentToolbar({
  search,
  setSearch,
  grid,
  setGrid,
}) {
  return (
    <div className="flex justify-between items-center mb-8">

      <div className="relative w-96">

        <FaSearch className="absolute left-4 top-4 text-gray-400"/>

        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search documents..."
          className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-900 border border-slate-800 outline-none"
        />

      </div>

      <div className="flex gap-3">

        <button
          onClick={()=>setGrid(true)}
          className={`p-3 rounded-xl ${
            grid
              ? "bg-indigo-600"
              : "bg-slate-900"
          }`}
        >
          <FaThLarge/>
        </button>

        <button
          onClick={()=>setGrid(false)}
          className={`p-3 rounded-xl ${
            !grid
              ? "bg-indigo-600"
              : "bg-slate-900"
          }`}
        >
          <FaList/>
        </button>

      </div>

    </div>
  );
}