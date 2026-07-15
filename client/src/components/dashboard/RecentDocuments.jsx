const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { addActivity } = require("../controllers/activityController");

const Document = require("../models/Document");
const extractPdfText = require("../utils/pdfExtractor");

const router = express.Router();

/* ===========================
   Multer Configuration
=========================== */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

/* ===========================
   Upload PDF
=========================== */

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    }

    // Extract PDF Text
    const extractedText = await extractPdfText(req.file.path);

    // Save Document
    const document = await Document.create({
      filename: req.file.originalname,
      filepath: req.file.path,
      filesize: req.file.size,
      uploadedBy: null,

      content: extractedText,
      summary: "",

      favorite: false,
      pinned: false,
    });

    res.status(201).json({
      success: true,
      message: "PDF Uploaded Successfully",
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

/* ===========================
   Get All Documents
=========================== */

router.get("/", async (req, res) => {
  try {
    const documents = await Document.find().sort({
      createdAt: -1,
    });

    res.json(documents);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

/* ===========================
   Preview PDF
=========================== */

router.get("/view/:id", async (req, res) => {
  try {

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    document.views += 1;
    document.lastOpened = new Date();

    await document.save();

    res.sendFile(
      path.resolve(document.filepath)
    );

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

/* ===========================
   Download PDF
=========================== */

router.get("/download/:id", async (req, res) => {
  try {

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    document.downloads += 1;

    await document.save();

    res.download(
      path.resolve(document.filepath),
      document.filename
    );

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

/* ===========================
   Favorite
=========================== */

router.put("/favorite/:id", async (req, res) => {
  try {

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    document.favorite = !document.favorite;

    await document.save();

    res.json({
      success: true,
      favorite: document.favorite,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

/* ===========================
   Pin
=========================== */

router.put("/pin/:id", async (req, res) => {
  try {

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    document.pinned = !document.pinned;

    await document.save();

    res.json({
      success: true,
      pinned: document.pinned,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

/* ===========================
   Delete PDF
=========================== */

router.delete("/:id", async (req, res) => {
  try {

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    if (fs.existsSync(document.filepath)) {
      fs.unlinkSync(document.filepath);
    }

    await Document.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "PDF Deleted Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;