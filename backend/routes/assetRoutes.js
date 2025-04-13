const express = require("express");
const {
    createAsset,
    getAssets,
    getAssetById,
    updateAsset,
    deleteAsset,
    assignAsset,
} = require("../controllers/assetController");
const { protect, adminOnly, superAdminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new asset — only Admin or Super Admin can create assets
router.post("/", protect, adminOnly, createAsset);

// Get all assets — Admins can view assets
router.get("/", protect, adminOnly, getAssets);

// Get a specific asset by ID — Admins can view details
router.get("/:id", protect, adminOnly, getAssetById);

// Update an asset — Admins can update assets
router.put("/:id", protect, adminOnly, updateAsset);

// Delete an asset — Only Super Admin can delete assets
router.delete("/:id", protect, superAdminOnly, deleteAsset);

// Assign an asset to a user — Admins can assign assets
router.put("/:id/assign", protect, adminOnly, assignAsset);

module.exports = router;
