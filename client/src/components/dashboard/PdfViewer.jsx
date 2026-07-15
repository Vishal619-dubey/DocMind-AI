import {
  FaTimes,
  FaDownload,
  FaExpand,
} from "react-icons/fa";

export default function PdfViewer({
  id,
  onClose,
}) {
  if (!id) return null;

  const pdfUrl = `https://docmind-ai-gmxl.onrender.com/api/documents/view/${id}`;

  const downloadPdf = () => {
    window.open(
      `https://docmind-ai-gmxl.onrender.com/api/documents/download/${id}`,
      "_blank"
    );
  };

  const openFullscreen = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">

      <div className="bg-slate-900 w-full max-w-7xl h-[92vh] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">

        {/* Header */}

        <div className="h-16 border-b border-slate-700 flex items-center justify-between px-6">

          <div>

            <h2 className="text-xl font-bold">
              PDF Preview
            </h2>

            <p className="text-sm text-gray-400">
              View your uploaded document
            </p>

          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={downloadPdf}
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl flex items-center gap-2 transition"
            >
              <FaDownload />

              Download
            </button>

            <button
              onClick={openFullscreen}
              className="bg-slate-700 hover:bg-slate-600 p-3 rounded-xl transition"
            >
              <FaExpand />
            </button>

            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-500 p-3 rounded-xl transition"
            >
              <FaTimes />
            </button>

          </div>

        </div>

        {/* PDF */}

        <iframe
          src={pdfUrl}
          title="PDF Preview"
          className="w-full h-[calc(92vh-64px)] bg-white"
        />

      </div>

    </div>
  );
}