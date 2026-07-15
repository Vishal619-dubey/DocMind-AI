import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
  Search,
  FolderOpen,
  Upload,
  ChevronDown,
} from "lucide-react";

import ChatWithPdf from "./ChatWithPdf";
import DocumentCard from "./DocumentCard";
import PdfViewer from "./PdfViewer";

const API_URL = "https://docmind-ai-gmxl.onrender.com";

export default function RecentDocuments() {
  const [documents, setDocuments] = useState([]);
  const [previewId, setPreviewId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Recent");
  const [loading, setLoading] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/api/documents`
      );

      setDocuments(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Fetch Documents Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();

    const refreshDocuments = () => {
      fetchDocuments();
    };

    window.addEventListener(
      "documentUploaded",
      refreshDocuments
    );

    return () => {
      window.removeEventListener(
        "documentUploaded",
        refreshDocuments
      );
    };
  }, []);

  const toggleFavorite = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/documents/favorite/${id}`
      );

      await fetchDocuments();
    } catch (error) {
      console.error("Favorite Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update favorite"
      );
    }
  };

  const togglePin = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/documents/pin/${id}`
      );

      await fetchDocuments();
    } catch (error) {
      console.error("Pin Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update pin"
      );
    }
  };

  const deleteDocument = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `${API_URL}/api/documents/${id}`
      );

      if (previewId === id) {
        setPreviewId(null);
      }

      await fetchDocuments();
    } catch (error) {
      console.error("Delete Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete document"
      );
    }
  };

  const downloadDocument = (id) => {
    window.open(
      `${API_URL}/api/documents/download/${id}`,
      "_blank"
    );
  };

  const generateSummary = async (id) => {
    try {
      setLoadingSummary(id);

      await axios.post(
        `${API_URL}/api/summary/${id}`
      );

      await fetchDocuments();
    } catch (error) {
      console.error("Summary Error:", error);

      alert(
        error.response?.data?.message ||
          "Summary generation failed"
      );
    } finally {
      setLoadingSummary(null);
    }
  };

  const filteredDocuments = useMemo(() => {
    let result = [...documents];

    const normalizedSearch = search
      .trim()
      .toLowerCase();

    if (normalizedSearch) {
      result = result.filter((document) =>
        (document.filename || "")
          .toLowerCase()
          .includes(normalizedSearch)
      );
    }

    if (filter !== "All") {
      result = result.filter(
        (document) =>
          (
            document.fileType || ""
          ).toLowerCase() ===
          filter.toLowerCase()
      );
    }

    if (sort === "A-Z") {
      result.sort((a, b) =>
        (a.filename || "").localeCompare(
          b.filename || ""
        )
      );
    }

    if (sort === "Recent") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
    }

    return result;
  }, [documents, search, filter, sort]);

  const scrollToUpload = () => {
    const uploadSection =
      document.getElementById(
        "upload-section"
      );

    if (uploadSection) {
      uploadSection.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
      {/* Header */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Documents
          </h2>

          <p className="mt-2 text-slate-400">
            Manage all your AI documents
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToUpload}
          className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 transition hover:bg-indigo-500"
        >
          <Upload size={18} />
          Upload
        </button>
      </div>

      {/* Toolbar */}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="relative min-w-[260px] flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search documents..."
            className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500"
          />
        </div>

        <div className="relative">
          <select
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value)
            }
            className="appearance-none rounded-2xl border border-slate-800 bg-slate-950 px-5 py-3 pr-10 outline-none"
          >
            <option>All</option>
            <option>PDF</option>
            <option>Image</option>
            <option>Audio</option>
            <option>Video</option>
            <option>DOCX</option>
            <option>XLSX</option>
            <option>PPTX</option>
            <option>TXT</option>
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
            className="appearance-none rounded-2xl border border-slate-800 bg-slate-950 px-5 py-3 pr-10 outline-none"
          >
            <option>Recent</option>
            <option>A-Z</option>
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </div>
      </div>

      {/* Documents */}

      <div className="mt-8 space-y-5">
        {loading ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-950/40 py-20 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />

            <p className="mt-5 text-slate-400">
              Loading documents...
            </p>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700 py-20 text-center">
            <FolderOpen
              size={60}
              className="mx-auto text-slate-600"
            />

            <h3 className="mt-6 text-2xl font-bold">
              No Documents Found
            </h3>

            <p className="mt-2 text-slate-400">
              Upload your first document to get
              started.
            </p>
          </div>
        ) : (
          filteredDocuments.map((document) => (
            <DocumentCard
              key={document._id}
              doc={document}
              onFavorite={toggleFavorite}
              onPin={togglePin}
              onPreview={setPreviewId}
              onDownload={downloadDocument}
              onDelete={deleteDocument}
              onSummary={generateSummary}
            >
              {loadingSummary ===
                document._id && (
                <div className="mt-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
                  <p className="animate-pulse text-indigo-400">
                    🤖 AI is generating
                    summary...
                  </p>
                </div>
              )}

              {document.summary && (
                <div className="mt-5">
                  <ChatWithPdf
                    documentId={document._id}
                  />
                </div>
              )}
            </DocumentCard>
          ))
        )}
      </div>

      {/* PDF Viewer */}

      {previewId && (
        <PdfViewer
          id={previewId}
          onClose={() =>
            setPreviewId(null)
          }
        />
      )}
    </div>
  );
}