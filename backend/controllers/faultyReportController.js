const asyncHandler = require("express-async-handler");
const FaultyReport = require("../models/faultyReport");

// @desc    Create a new faulty report
// @route   POST /api/faulty-reports
// @access  Protected (Any authenticated user)
const createFaultyReport = asyncHandler(async (req, res) => {
    const { asset, issue, notes } = req.body;

    if (!asset || !issue) {
        res.status(400);
        throw new Error("Asset and issue are required.");
    }

    const report = await FaultyReport.create({
        asset,
        issue,
        notes,
        reportedBy: req.user._id, // Provided by auth middleware
    });

    res.status(201).json(report);
});

// @desc    Get all faulty reports
// @route   GET /api/faulty-reports
// @access  Protected (Admins can see all reports)
const getFaultyReports = asyncHandler(async (req, res) => {
    const reports = await FaultyReport.find()
        .populate("asset", "name serialNumber")
        .populate("reportedBy", "name email");
    res.json(reports);
});

// @desc    Get a faulty report by ID
// @route   GET /api/faulty-reports/:id
// @access  Protected
const getFaultyReportById = asyncHandler(async (req, res) => {
    const report = await FaultyReport.findById(req.params.id)
        .populate("asset", "name serialNumber")
        .populate("reportedBy", "name email");
    if (report) {
        res.json(report);
    } else {
        res.status(404);
        throw new Error("Faulty report not found");
    }
});

// @desc    Update a faulty report (e.g., update status, add notes)
// @route   PUT /api/faulty-reports/:id
// @access  Protected (Admins can update)
const updateFaultyReport = asyncHandler(async (req, res) => {
    const report = await FaultyReport.findById(req.params.id);
    if (!report) {
        res.status(404);
        throw new Error("Faulty report not found");
    }

    report.status = req.body.status || report.status;
    report.notes = req.body.notes || report.notes;

    const updatedReport = await report.save();
    res.json(updatedReport);
});

// @desc    Delete a faulty report
// @route   DELETE /api/faulty-reports/:id
// @access  Protected (Admins only)
const deleteFaultyReport = asyncHandler(async (req, res) => {
    const report = await FaultyReport.findById(req.params.id);
    if (!report) {
        res.status(404);
        throw new Error("Faulty report not found");
    }

    await report.deleteOne();
    res.json({ message: "Faulty report deleted successfully" });
});

module.exports = {
    createFaultyReport,
    getFaultyReports,
    getFaultyReportById,
    updateFaultyReport,
    deleteFaultyReport,
};
