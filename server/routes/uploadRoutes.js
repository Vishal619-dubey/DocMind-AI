const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const Document = require("../models/Document");

const router = express.Router();

/* =====================================
   Upload Directory
===================================== */

const uploadDirectory = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

/* =====================================
   Storage
===================================== */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const safeOriginalName = file.originalname
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    const uniqueName = `${Date.now()}-${safeOriginalName}`;

    cb(null, uniqueName);
  },
});

/* =====================================
   Allowed File Types
===================================== */

const allowedTypes = [
  "application/pdf",

  "image/png",
  "image/jpeg",
  "image/webp",

  "audio/mpeg",
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

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  return cb(new Error("Unsupported file type"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

/* =====================================
   Detect File Type
===================================== */

function getFileType(mimetype = "") {
  if (mimetype.includes("pdf")) return "pdf";
  if (mimetype.startsWith("image/")) return "image";
  if (mimetype.startsWith("audio/")) return "audio";
  if (mimetype.startsWith("video/")) return "video";
  if (mimetype.includes("wordprocessingml")) return "docx";
  if (mimetype.includes("spreadsheetml")) return "xlsx";
  if (mimetype.includes("presentationml")) return "pptx";
  if (mimetype.includes("text")) return "txt";

  return "other";
}

/* =====================================
   Upload Route
===================================== */

router.post("/", (req, res) => {
  upload.single("file")(req, res, async (uploadError) => {
    if (uploadError) {
      console.error("Multer Error:", uploadError.message);

      return res.status(400).json({
        success: false,
        message: uploadError.message,
      });
    }

    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const fileType = getFileType(req.file.mimetype);

      let extractedContent = "";

      if (fileType === "pdf") {
        const buffer = fs.readFileSync(req.file.path);
        const parsedPdf = await pdfParse(buffer);

        extractedContent = parsedPdf.text || "";
      }

      const document = await Document.create({
        filename: req.file.originalname,
        filepath: req.file.path,
        filesize: req.file.size,
        mimeType: req.file.mimetype,
        fileType,
        content: extractedContent,
        summary: "",
        favorite: false,
        pinned: false,
        uploadedBy: null,
      });

      return res.status(201).json({
        success: true,
        message: "File uploaded successfully",
        document,
      });
    } catch (error) {
      console.error("Upload Error:", error);

      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(500).json({
        success: false,
        message: error.message || "File upload failed",
      });
    }
  });
});

module.exports = router;