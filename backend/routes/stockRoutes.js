const express = require("express");
const {
    createStockRecord,
    getStockRecords,
    getStockById,
    updateStock,
    deleteStock,
} = require("../controllers/stockController");
const { protect, adminOnly, superAdminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new stock record (Admins and Super Admins)
router.post("/", protect, adminOnly, createStockRecord);

// Get all stock records (Admins and Super Admins)
router.get("/", protect, adminOnly, getStockRecords);

// Get a stock record by ID (Admins and Super Admins)
router.get("/:id", protect, adminOnly, getStockById);

// Update a stock record (Admins and Super Admins)
router.put("/:id", protect, adminOnly, updateStock);

// Delete a stock record (Super Admin only)
router.delete("/:id", protect, superAdminOnly, deleteStock);

module.exports = router;
