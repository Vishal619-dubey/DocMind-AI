import {
  FileText,
  Image,
  FileVideo,
  FileAudio,
  FileSpreadsheet,
  Presentation,
  FileCode,
  Star,
  Pin,
  Eye,
  Download,
  Trash2,
  Sparkles,

  Calendar,
  HardDrive,

} from "lucide-react";

export default function DocumentCard({
  doc,
  onFavorite,
  onPin,
  onPreview,
  onDownload,
  onDelete,
  onSummary,
  children,
}) {
  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return (
          <FileText className="w-8 h-8 text-red-500" />
        );

      case "image":
        return (
          <Image className="w-8 h-8 text-green-500" />
        );

      case "video":
        return (
          <FileVideo className="w-8 h-8 text-purple-500" />
        );

      case "audio":
        return (
          <FileAudio className="w-8 h-8 text-pink-500" />
        );

      case "docx":
        return (
          <FileText className="w-8 h-8 text-blue-500" />
        );

      case "xlsx":
        return (
          <FileSpreadsheet className="w-8 h-8 text-emerald-500" />
        );

      case "pptx":
        return (
          <Presentation className="w-8 h-8 text-orange-500" />
        );

      default:
        return (
          <FileCode className="w-8 h-8 text-gray-400" />
        );
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-[0_20px_80px_rgba(99,102,241,0.18)]">
<div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>
      {/* HEADER */}

      <div className="relative z-10 flex justify-between items-start">

        <div className="flex gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800">
  {getFileIcon(doc.fileType)}
</div>

          <div>

            <h2 className="text-xl font-semibold tracking-tight text-white">

              {doc.filename}

            </h2>

            <div className="flex gap-2 mt-2">

              <span className="px-3 py-1 rounded-full text-xs bg-indigo-500/20 text-indigo-300 uppercase">

                {doc.fileType}

              </span>

              <span className="px-3 py-1 rounded-full text-xs bg-slate-700">

                {(doc.filesize / 1024).toFixed(2)} KB

              </span>

            </div>

            <div className="mt-4 flex flex-wrap gap-3">

  <div className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-xs text-slate-300">

    <Calendar size={14} />

    {new Date(doc.createdAt).toLocaleDateString()}

  </div>

  <div className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-xs text-slate-300">

    <HardDrive size={14} />

    {(doc.filesize / 1024).toFixed(2)} KB

  </div>

</div>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="flex gap-2">

          <button
            onClick={() => onFavorite(doc._id)}
            className={`rounded-xl p-3 transition ${
              doc.favorite
                ? "bg-yellow-500 text-black"
                : "bg-slate-800 hover:bg-yellow-500 hover:text-black"
            }`}
          >
            <Star size={18} />
          </button>

          <button
            onClick={() => onPin(doc._id)}
            className={`rounded-xl p-3 transition ${
              doc.pinned
                ? "bg-indigo-600"
                : "bg-slate-800 hover:bg-indigo-600"
            }`}
          >
            <Pin size={18} />
          </button>

          <button
            onClick={() => onPreview(doc._id)}
            className="rounded-xl p-3 bg-slate-800 hover:bg-slate-700 transition"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onDownload(doc._id)}
            className="rounded-xl p-3 bg-slate-800 hover:bg-slate-700 transition"
          >
            <Download size={18} />
          </button>

          <button
            onClick={() => onSummary(doc._id)}
            className="flex items-center gap-2 rounded-xl px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition"
          >
            <Sparkles size={18} />

            AI
          </button>

          <button
            onClick={() => onDelete(doc._id)}
            className="rounded-xl p-3 bg-red-600 hover:bg-red-500 transition"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

      {/* SUMMARY */}

      {doc.summary && (

        <div className="mt-6 rounded-2xl bg-slate-950 border border-slate-800 p-5">

          <h3 className="text-indigo-400 font-bold flex items-center gap-2 mb-3">

            <Sparkles size={18} />

            AI Summary

          </h3>

          <p className="text-gray-300 whitespace-pre-wrap leading-7">

            {doc.summary}

          </p>

        </div>

      )}

      {/* CHAT */}

      {children}

    </div>
  );
}