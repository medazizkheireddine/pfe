const express = require("express");
const {
    createFaultyReport,
    getFaultyReports,
    getFaultyReportById,
    updateFaultyReport,
    deleteFaultyReport,
} = require("../controllers/faultyReportController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a faulty report (any authenticated user)
router.post("/", protect, createFaultyReport);

// Get all faulty reports (Admins only)
router.get("/", protect, adminOnly, getFaultyReports);

// Get a specific faulty report by ID
router.get("/:id", protect, getFaultyReportById);

// Update a faulty report (Admins only)
router.put("/:id", protect, adminOnly, updateFaultyReport);

// Delete a faulty report (Admins only)
router.delete("/:id", protect, adminOnly, deleteFaultyReport);

module.exports = router;
