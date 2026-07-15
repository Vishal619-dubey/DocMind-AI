import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaTimes,
  FaDownload,
  FaExpand,
  FaSpinner,
} from "react-icons/fa";

const API_URL = "https://docmind-ai-gmxl.onrender.com";

export default function PdfViewer({
  id,
  token,
  onClose,
}) {
  const [pdfBlobUrl, setPdfBlobUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let generatedBlobUrl = "";

    const loadPdf = async () => {
      if (!id || !token) {
        setError("Authentication required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/api/documents/view/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );

        generatedBlobUrl = window.URL.createObjectURL(
          new Blob([response.data], {
            type:
              response.headers["content-type"] ||
              "application/pdf",
          })
        );

        setPdfBlobUrl(generatedBlobUrl);
      } catch (err) {
        console.error("PDF Preview Error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to preview this document"
        );
      } finally {
        setLoading(false);
      }
    };

    loadPdf();

    return () => {
      if (generatedBlobUrl) {
        window.URL.revokeObjectURL(generatedBlobUrl);
      }
    };
  }, [id, token]);

  if (!id) return null;

  const downloadPdf = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/documents/download/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const blobUrl = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = blobUrl;
      link.setAttribute("download", "document.pdf");

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("PDF Download Error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to download document"
      );
    }
  };

  const openFullscreen = () => {
    if (!pdfBlobUrl) return;

    window.open(pdfBlobUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8">
      <div className="flex h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        {/* Header */}

        <div className="flex min-h-16 items-center justify-between gap-4 border-b border-slate-700 px-4 py-3 sm:px-6">
          <div>
            <h2 className="text-xl font-bold">
              PDF Preview
            </h2>

            <p className="text-sm text-gray-400">
              View your uploaded document
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={downloadPdf}
              disabled={loading || !pdfBlobUrl}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
            >
              <FaDownload />

              <span className="hidden sm:inline">
                Download
              </span>
            </button>

            <button
              type="button"
              onClick={openFullscreen}
              disabled={loading || !pdfBlobUrl}
              title="Open in new tab"
              className="rounded-xl bg-slate-700 p-3 transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaExpand />
            </button>

            <button
              type="button"
              onClick={onClose}
              title="Close preview"
              className="rounded-xl bg-red-600 p-3 transition hover:bg-red-500"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Viewer */}

        <div className="relative flex-1 bg-slate-950">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <FaSpinner className="animate-spin text-4xl text-indigo-500" />

              <p className="mt-4 text-slate-400">
                Loading PDF...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <h3 className="text-xl font-semibold text-red-400">
                Preview Failed
              </h3>

              <p className="mt-2 max-w-lg text-slate-400">
                {error}
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-xl bg-slate-800 px-5 py-3 transition hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          )}

          {!loading && !error && pdfBlobUrl && (
            <iframe
              src={pdfBlobUrl}
              title="PDF Preview"
              className="h-full w-full bg-white"
            />
          )}
        </div>
      </div>
    </div>
  );
}