const asyncHandler = require('express-async-handler');
const MaterialRequest = require('../models/materialRequests');

// @desc    Create a new material request
// @route   POST /api/material-requests
// @access  Protected (Authenticated users)
const createMaterialRequest = asyncHandler(async (req, res) => {
    const { items, notes } = req.body;

    // Ensure items and employee (req.user is set by protect middleware) are provided
    if (!items || items.length === 0) {
        res.status(400);
        throw new Error('Please provide at least one requested item');
    }

    const materialRequest = await MaterialRequest.create({
        employee: req.user._id,
        items,
        notes,
    });

    res.status(201).json(materialRequest);
});

// @desc    Get all material requests
// @route   GET /api/material-requests
// @access  Protected (Admin only)
const getMaterialRequests = asyncHandler(async (req, res) => {
    const requests = await MaterialRequest.find()
        .populate('employee', 'name email');
    res.json(requests);
});

// @desc    Get a material request by ID
// @route   GET /api/material-requests/:id
// @access  Protected (Admin only)
const getMaterialRequestById = asyncHandler(async (req, res) => {
    const request = await MaterialRequest.findById(req.params.id)
        .populate('employee', 'name email');
    if (request) {
        res.json(request);
    } else {
        res.status(404);
        throw new Error('Material request not found');
    }
});

// @desc    Update a material request (e.g., approve or reject)
// @route   PUT /api/material-requests/:id
// @access  Protected (Admin only)
const updateMaterialRequest = asyncHandler(async (req, res) => {
    const request = await MaterialRequest.findById(req.params.id);
    if (!request) {
        res.status(404);
        throw new Error('Material request not found');
    }

    // Update allowed fields: status, notes, and items (if applicable)
    request.status = req.body.status || request.status;
    request.notes = req.body.notes || request.notes;
    if (req.body.items) {
        request.items = req.body.items;
    }

    const updatedRequest = await request.save();
    res.json(updatedRequest);
});

// @desc    Delete a material request
// @route   DELETE /api/material-requests/:id
// @access  Protected (Admin only)
const deleteMaterialRequest = asyncHandler(async (req, res) => {
    const request = await MaterialRequest.findById(req.params.id);
    if (!request) {
        res.status(404);
        throw new Error('Material request not found');
    }

    await request.deleteOne();
    res.json({ message: 'Material request deleted successfully' });
});

module.exports = {
    createMaterialRequest,
    getMaterialRequests,
    getMaterialRequestById,
    updateMaterialRequest,
    deleteMaterialRequest,
};
