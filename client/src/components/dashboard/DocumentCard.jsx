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
        return <FileText className="h-8 w-8 text-red-500" />;

      case "image":
        return <Image className="h-8 w-8 text-green-500" />;

      case "video":
        return <FileVideo className="h-8 w-8 text-purple-500" />;

      case "audio":
        return <FileAudio className="h-8 w-8 text-pink-500" />;

      case "docx":
        return <FileText className="h-8 w-8 text-blue-500" />;

      case "xlsx":
        return (
          <FileSpreadsheet className="h-8 w-8 text-emerald-500" />
        );

      case "pptx":
        return <Presentation className="h-8 w-8 text-orange-500" />;

      default:
        return <FileCode className="h-8 w-8 text-gray-400" />;
    }
  };

  const isPdf = doc.fileType === "pdf";

  const fileSize = (
    Number(doc.filesize || 0) / 1024
  ).toFixed(2);

  const uploadDate = doc.createdAt
    ? new Date(doc.createdAt).toLocaleDateString()
    : "Unknown date";

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-[0_20px_80px_rgba(99,102,241,0.18)]">
      {/* Hover Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-violet-500/5 opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Header */}
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* File Details */}
        <div className="flex min-w-0 gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800">
            {getFileIcon(doc.fileType)}
          </div>

          <div className="min-w-0">
            <h2
              className="truncate text-xl font-semibold tracking-tight text-white"
              title={doc.filename}
            >
              {doc.filename}
            </h2>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium uppercase text-indigo-300">
                {doc.fileType || "file"}
              </span>

              <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                {fileSize} KB
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-xs text-slate-300">
                <Calendar size={14} />
                {uploadDate}
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-xs text-slate-300">
                <HardDrive size={14} />
                {fileSize} KB
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 lg:justify-end">
          <button
            type="button"
            onClick={() => onFavorite(doc._id)}
            title={
              doc.favorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
            className={`rounded-xl p-3 transition ${
              doc.favorite
                ? "bg-yellow-500 text-black"
                : "bg-slate-800 text-slate-300 hover:bg-yellow-500 hover:text-black"
            }`}
          >
            <Star
              size={18}
              fill={doc.favorite ? "currentColor" : "none"}
            />
          </button>

          <button
            type="button"
            onClick={() => onPin(doc._id)}
            title={doc.pinned ? "Unpin document" : "Pin document"}
            className={`rounded-xl p-3 transition ${
              doc.pinned
                ? "bg-indigo-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-indigo-600 hover:text-white"
            }`}
          >
            <Pin
              size={18}
              fill={doc.pinned ? "currentColor" : "none"}
            />
          </button>

          <button
            type="button"
            onClick={() => onPreview(doc._id)}
            title="Preview document"
            className="rounded-xl bg-slate-800 p-3 text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            <Eye size={18} />
          </button>

          <button
            type="button"
            onClick={() => onDownload(doc._id)}
            title="Download document"
            className="rounded-xl bg-slate-800 p-3 text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            <Download size={18} />
          </button>

          <button
            type="button"
            onClick={() => {
              if (isPdf) {
                onSummary(doc._id);
              }
            }}
            disabled={!isPdf}
            title={
              isPdf
                ? "Generate AI summary"
                : "AI summary is currently available only for PDF files"
            }
            className={`flex items-center gap-2 rounded-xl px-4 py-3 font-medium transition-all duration-300 ${
              isPdf
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30"
                : "cursor-not-allowed bg-slate-800 text-slate-500 opacity-60"
            }`}
          >
            <Sparkles size={18} />
            {isPdf ? "AI Summary" : "PDF Only"}
          </button>

          <button
            type="button"
            onClick={() => onDelete(doc._id)}
            title="Delete document"
            className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* AI Summary */}
      {doc.summary && (
        <div className="relative z-10 mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <h3 className="mb-3 flex items-center gap-2 font-bold text-indigo-400">
            <Sparkles size={18} />
            AI Summary
          </h3>

          <p className="whitespace-pre-wrap leading-7 text-gray-300">
            {doc.summary}
          </p>
        </div>
      )}

      {/* Chat */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}