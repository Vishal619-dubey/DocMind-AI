import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
}) {
  return (
    <div className="relative w-full max-w-md">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <input
        value={value}
        onChange={onChange}
        placeholder="Search documents..."
        className="
        w-full
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        py-3
        pl-12
        pr-12
        text-sm
        outline-none
        transition
        focus:border-indigo-500
        focus:ring-4
        focus:ring-indigo-500/10
        "
      />

      {value && (
        <button
          onClick={() =>
            onChange({
              target: {
                value: "",
              },
            })
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}