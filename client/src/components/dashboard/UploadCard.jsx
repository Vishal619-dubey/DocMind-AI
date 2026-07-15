import { useRef, useState } from "react";
import axios from "axios";
import {
  FaCloudUploadAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function UploadCard() {
  const inputRef = useRef();

  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState("");

  const allowedTypes = [
    "application/pdf",

    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",

    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/mp4",

    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    "application/vnd.openxmlformats-officedocument.presentationml.presentation",

    "text/plain",
  ];

  const uploadFile = async (file) => {
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      alert("❌ Unsupported File Type");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setProgress(0);
      setUploaded("");

      await axios.post(
        "https://docmind-ai-gmxl.onrender.com/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (event) => {
            const percent = Math.round(
              (event.loaded * 100) / event.total
            );

            setProgress(percent);
          },
        }
      );

      setUploaded(file.name);

      alert("✅ File Uploaded Successfully");

      window.location.reload();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message || "Upload Failed"
      );

    } finally {

      setUploading(false);

    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-3xl font-bold">
            AI Workspace Upload
          </h2>

          <p className="text-gray-400 mt-2">
            Upload PDFs, Images, Audio, Video, Office Files & More
          </p>

        </div>

        <FaCloudUploadAlt className="text-6xl text-indigo-500" />

      </div>

      {/* Upload Area */}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();

          setDrag(false);

          uploadFile(e.dataTransfer.files[0]);
        }}
        onClick={() => inputRef.current.click()}
        className={`mt-10 cursor-pointer border-2 border-dashed rounded-3xl p-14 text-center transition duration-300

        ${
          drag
            ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]"
            : "border-slate-700 hover:border-indigo-500 hover:bg-slate-800/50"
        }`}
      >

        <FaCloudUploadAlt className="mx-auto text-7xl text-indigo-500 mb-6" />

        <h3 className="text-2xl font-bold">

          Drag & Drop Files Here

        </h3>

        <p className="text-gray-400 mt-3">

          or Click to Browse

        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">

          {[
            "PDF",
            "JPG",
            "PNG",
            "WEBP",
            "MP3",
            "WAV",
            "MP4",
            "MOV",
            "DOCX",
            "XLSX",
            "PPTX",
            "TXT",
          ].map((type) => (

            <span
              key={type}
              className="px-4 py-2 rounded-full bg-slate-800 text-sm border border-slate-700"
            >
              {type}
            </span>

          ))}

        </div>

      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,.webp,.mp3,.wav,.mp4,.mov,.docx,.xlsx,.pptx,.txt"
        onChange={(e) =>
          uploadFile(e.target.files[0])
        }
      />

      {/* Progress */}

      {uploading && (

        <div className="mt-10">

          <div className="flex justify-between text-sm mb-2">

            <span>Uploading...</span>

            <span>{progress}%</span>

          </div>

          <div className="w-full h-4 rounded-full bg-slate-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      )}

      {/* Success */}

      {uploaded && (

        <div className="mt-8 bg-green-500/10 border border-green-500 rounded-2xl p-5 flex items-center gap-4">

          <FaCheckCircle className="text-3xl text-green-400" />

          <div>

            <h3 className="font-bold">
              Upload Successful 🎉
            </h3>

            <p className="text-gray-300 text-sm">
              {uploaded}
            </p>

          </div>

        </div>

      )}

    </div>
  );
}