const express = require("express");
const fs = require("fs");
const path = require("path");

const Document = require("../models/Document");
const { protect } = require("../middleware/authMiddleware");
const { addActivity } = require("../controllers/activityController");

const router = express.Router();

/* =====================================
   GET LOGGED-IN USER DOCUMENTS
===================================== */

router.get("/", protect, async (req, res) => {
  try {
    const documents = await Document.find({
      uploadedBy: req.user._id,
    }).sort({
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

/* =====================================
   PREVIEW DOCUMENT
===================================== */

router.get("/view/:id", protect, async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      uploadedBy: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found or access denied",
      });
    }

    if (!document.filepath || !fs.existsSync(document.filepath)) {
      return res.status(410).json({
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
    console.error("Preview Document Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to preview document",
    });
  }
});

/* =====================================
   DOWNLOAD DOCUMENT
===================================== */

router.get("/download/:id", protect, async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      uploadedBy: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found or access denied",
      });
    }

    if (!document.filepath || !fs.existsSync(document.filepath)) {
      return res.status(410).json({
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
    console.error("Download Document Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to download document",
    });
  }
});

/* =====================================
   TOGGLE FAVORITE
===================================== */

router.put("/favorite/:id", protect, async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      uploadedBy: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found or access denied",
      });
    }

    document.favorite = !document.favorite;

    await document.save();

    await addActivity(
      document.favorite
        ? "Added to Favorites"
        : "Removed from Favorites",
      document.filename,
      "star",
      "yellow"
    );

    return res.status(200).json({
      success: true,
      message: document.favorite
        ? "Added to favorites"
        : "Removed from favorites",
      favorite: document.favorite,
    });
  } catch (error) {
    console.error("Favorite Document Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to update favorite",
    });
  }
});

/* =====================================
   TOGGLE PIN
===================================== */

router.put("/pin/:id", protect, async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      uploadedBy: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found or access denied",
      });
    }

    document.pinned = !document.pinned;

    await document.save();

    await addActivity(
      document.pinned
        ? "Pinned Document"
        : "Unpinned Document",
      document.filename,
      "pin",
      "indigo"
    );

    return res.status(200).json({
      success: true,
      message: document.pinned
        ? "Document pinned"
        : "Document unpinned",
      pinned: document.pinned,
    });
  } catch (error) {
    console.error("Pin Document Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to update pin",
    });
  }
});

/* =====================================
   DELETE DOCUMENT
===================================== */

router.delete("/:id", protect, async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      uploadedBy: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found or access denied",
      });
    }

    if (document.filepath && fs.existsSync(document.filepath)) {
      fs.unlinkSync(document.filepath);
    }

    await Document.deleteOne({
      _id: document._id,
      uploadedBy: req.user._id,
    });

    await addActivity(
      "Deleted Document",
      document.filename,
      "trash",
      "red"
    );

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Delete Document Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete document",
    });
  }
});

module.exports = router;