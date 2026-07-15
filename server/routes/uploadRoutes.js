const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const Document = require("../models/Document");

const router = express.Router();

/* =====================================
   Storage
===================================== */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      file.originalname.replace(/\s+/g, "-");

    cb(null, uniqueName);
  },
});

/* =====================================
   Allowed Files
===================================== */

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

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported File Type"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, //100MB
  },
});

/* =====================================
   Detect File Type
===================================== */

function getFileType(mimetype) {
  if (mimetype.includes("pdf")) return "pdf";

  if (mimetype.startsWith("image")) return "image";

  if (mimetype.startsWith("audio")) return "audio";

  if (mimetype.startsWith("video")) return "video";

  if (mimetype.includes("word")) return "docx";

  if (mimetype.includes("spreadsheet")) return "xlsx";

  if (mimetype.includes("presentation")) return "pptx";

  if (mimetype.includes("text")) return "txt";

  return "other";
}

/* =====================================
   Upload Route
===================================== */

router.post("/", upload.single("file"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const fileType = getFileType(req.file.mimetype);

    let extractedContent = "";

    /* PDF Text Extraction */

    if (fileType === "pdf") {
      const buffer = fs.readFileSync(req.file.path);

      const pdf = await pdfParse(buffer);

      extractedContent = pdf.text;
    }

    const document = await Document.create({
      filename: req.file.originalname,

      filepath: req.file.path,

      filesize: req.file.size,

      mimeType: req.file.mimetype,

      fileType,

      content: extractedContent,

      uploadedBy: null,
    });

    res.status(201).json({
      success: true,
      message: "File Uploaded Successfully",
      document,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
});

module.exports = router;