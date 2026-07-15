const express = require("express");
const fs = require("fs");
const path = require("path");

const Document = require("../models/Document");
const { addActivity } = require("../controllers/activityController");

const router = express.Router();

/* ===========================
   Get All Documents
=========================== */

router.get("/", async (req, res) => {
  try {
    const documents = await Document.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(documents);
  } catch (error) {
    console.error("Get Documents Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch documents",
    });
  }
});

/* ===========================
   Preview Document
=========================== */

router.get("/view/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (!document.filepath || !fs.existsSync(document.filepath)) {
      return res.status(404).json({
        success: false,
        message:
          "Document file is no longer available. Please upload it again.",
      });
    }

    document.views = (document.views || 0) + 1;
    document.lastOpened = new Date();

    await document.save();

    return res.sendFile(path.resolve(document.filepath));
  } catch (error) {
    console.error("Preview Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to preview document",
    });
  }
});

/* ===========================
   Download Document
=========================== */

router.get("/download/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (!document.filepath || !fs.existsSync(document.filepath)) {
      return res.status(404).json({
        success: false,
        message:
          "Document file is no longer available. Please upload it again.",
      });
    }

    document.downloads = (document.downloads || 0) + 1;

    await document.save();

    return res.download(
      path.resolve(document.filepath),
      document.filename
    );
  } catch (error) {
    console.error("Download Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to download document",
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
        success: false,
        message: "Document not found",
      });
    }

    document.favorite = !document.favorite;

    await document.save();

    try {
      await addActivity(
        document.favorite
          ? "Added to Favorites"
          : "Removed from Favorites",
        document.filename,
        "star",
        "yellow"
      );
    } catch (activityError) {
      console.error(
        "Favorite Activity Error:",
        activityError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: document.favorite
        ? "Added to favorites"
        : "Removed from favorites",
      favorite: document.favorite,
    });
  } catch (error) {
    console.error("Favorite Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to update favorite",
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
        success: false,
        message: "Document not found",
      });
    }

    document.pinned = !document.pinned;

    await document.save();

    try {
      await addActivity(
        document.pinned
          ? "Pinned Document"
          : "Unpinned Document",
        document.filename,
        "pin",
        "indigo"
      );
    } catch (activityError) {
      console.error(
        "Pin Activity Error:",
        activityError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: document.pinned
        ? "Document pinned"
        : "Document unpinned",
      pinned: document.pinned,
    });
  } catch (error) {
    console.error("Pin Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to update pin",
    });
  }
});

/* ===========================
   Delete Document
=========================== */

router.delete("/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (document.filepath && fs.existsSync(document.filepath)) {
      fs.unlinkSync(document.filepath);
    }

    await Document.findByIdAndDelete(req.params.id);

    try {
      await addActivity(
        "Deleted Document",
        document.filename,
        "trash",
        "red"
      );
    } catch (activityError) {
      console.error(
        "Delete Activity Error:",
        activityError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete document",
    });
  }
});

module.exports = router;