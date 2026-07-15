import { useEffect, useState } from "react";
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

export default function RecentDocuments() {

  const [documents, setDocuments] = useState([]);

  const [previewId, setPreviewId] = useState(null);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [sort, setSort] = useState("Recent");

  const [loadingSummary, setLoadingSummary] =
    useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(
        "https://docmind-ai-gmxl.onrender.com/api/documents"
      );

      setDocuments(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const toggleFavorite = async (id) => {
    await axios.put(
      `https://docmind-ai-gmxl.onrender.com/api/documents/favorite/${id}`
    );

    fetchDocuments();
  };

  const togglePin = async (id) => {
    await axios.put(
      `https://docmind-ai-gmxl.onrender.com/api/documents/pin/${id}`
    );

    fetchDocuments();
  };

  const deleteDocument = async (id) => {

    if (!window.confirm("Delete document?"))
      return;

    await axios.delete(
      `https://docmind-ai-gmxl.onrender.com/api/documents/${id}`
    );

    fetchDocuments();

  };

  const downloadPdf = (id) => {

    window.open(
      `https://docmind-ai-gmxl.onrender.com/api/documents/download/${id}`,
      "_blank"
    );

  };

  const generateSummary = async (id) => {

    try {

      setLoadingSummary(id);

      await axios.post(
        `https://docmind-ai-gmxl.onrender.com/api/summary/${id}`
      );

      fetchDocuments();

    } catch {

      alert("Summary Failed");

    }

    setLoadingSummary(null);

  };

  let filtered = documents.filter((doc) =>
    doc.filename
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (filter !== "All") {

    filtered = filtered.filter(
      (doc) =>
        doc.fileType.toLowerCase() ===
        filter.toLowerCase()
    );

  }

  if (sort === "A-Z") {

    filtered.sort((a, b) =>
      a.filename.localeCompare(b.filename)
    );

  }

  if (sort === "Recent") {

    filtered.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

  }

  return (

    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold">

            Documents

          </h2>

          <p className="text-slate-400 mt-2">

            Manage all your AI documents

          </p>

        </div>

        <button className="rounded-2xl bg-indigo-600 px-5 py-3 flex items-center gap-2 hover:bg-indigo-500 transition">

          <Upload size={18} />

          Upload

        </button>

      </div>

      {/* Toolbar */}

      <div className="mt-8 flex items-center gap-4 flex-wrap">

        <div className="relative flex-1 min-w-[280px]">

          <Search
            size={18}
            className="absolute left-4 top-4 text-slate-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search documents..."
            className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 outline-none focus:border-indigo-500 transition"
          />

        </div>

        <div className="relative">

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="appearance-none rounded-2xl border border-slate-800 bg-slate-950 px-5 py-3 pr-10 outline-none"
          >

            <option>All</option>

            <option>PDF</option>

            <option>Image</option>

            <option>Audio</option>

            <option>Video</option>

            <option>DOCX</option>

          </select>

          <ChevronDown
            size={18}
            className="absolute right-3 top-4 text-slate-500 pointer-events-none"
          />

        </div>

        <div className="relative">

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="appearance-none rounded-2xl border border-slate-800 bg-slate-950 px-5 py-3 pr-10 outline-none"
          >

            <option>Recent</option>

            <option>A-Z</option>

          </select>

          <ChevronDown
            size={18}
            className="absolute right-3 top-4 text-slate-500 pointer-events-none"
          />

        </div>

      </div>

      <div className="mt-8 space-y-5">

  {filtered.length === 0 ? (

    <div className="rounded-3xl border border-dashed border-slate-700 py-20 text-center">

      <FolderOpen
        size={60}
        className="mx-auto text-slate-600"
      />

      <h3 className="mt-6 text-2xl font-bold">
        No Documents Found
      </h3>

      <p className="mt-2 text-slate-400">
        Upload your first document to get started.
      </p>

    </div>

  ) : (

    filtered.map((doc) => (

      <DocumentCard
        key={doc._id}
        doc={doc}
        onFavorite={toggleFavorite}
        onPin={togglePin}
        onPreview={setPreviewId}
        onDownload={downloadPdf}
        onDelete={deleteDocument}
        onSummary={generateSummary}
      >

        {loadingSummary === doc._id && (

          <div className="mt-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 p-4">

            <p className="animate-pulse text-indigo-400">
              🤖 AI is generating summary...
            </p>

          </div>

        )}

        {doc.summary && (

          <div className="mt-5">
            <ChatWithPdf documentId={doc._id} />
          </div>

        )}

      </DocumentCard>

    ))

  )}

</div>
      {previewId && (
        <PdfViewer
          id={previewId}
          onClose={() => setPreviewId(null)}
        />
      )}

    </div>

  );

}
      
      