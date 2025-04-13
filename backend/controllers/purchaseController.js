/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

const asyncHandler = require("express-async-handler");
const Purchase = require("../models/purchaseRequests");


// @desc    Create a new purchase request
// @route   POST /api/purchases
// @access  Protected (Admin or Super Admin)
const createPurchase = asyncHandler(async (req, res) => {

    const { itemName, quantity, vendor, notes } = req.body;

    // Validate input fields (you can add more validation if needed)
    if (!itemName || !quantity || !vendor) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    // Create a new purchase request
    const purchase = await Purchase.create({
        itemName,
        quantity,
        vendor,
        notes,
        requestedBy: req.user._id, // req.user should be available via auth middleware
    });

    res.status(201).json(purchase);
});

// @desc    Get all purchase requests
// @route   GET /api/purchases
// @access  Protected (Admins can view, Super Admin can view everything)
const getPurchases = asyncHandler(async (req, res) => {
    // Optionally, filter by role or additional parameters.
    const purchases = await Purchase.find().populate("requestedBy", "name email").populate("approvedBy", "name email");
    res.json(purchases);
});

// @desc    Get a purchase by ID
// @route   GET /api/purchases/:id
// @access  Protected
const getPurchaseById = asyncHandler(async (req, res) => {
    const purchase = await Purchase.findById(req.params.id).populate("requestedBy", "name email").populate("approvedBy", "name email");
    if (purchase) {
        res.json(purchase);
    } else {
        res.status(404);
        throw new Error("Purchase not found");
    }
});

// @desc    Update a purchase request (e.g., approve or reject)
// @route   PUT /api/purchases/:id
// @access  Protected (Admin or Super Admin)
const updatePurchase = asyncHandler(async (req, res) => {
    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
        res.status(404);
        throw new Error("Purchase not found");
    }

    // Allow update of relevant fields: status, approvedBy, etc.
    purchase.status = req.body.status || purchase.status;
    if (req.body.status === "Approved") {
        purchase.approvedBy = req.user._id;
    }
    if (req.body.notes) {
        purchase.notes = req.body.notes;
    }

    const updatedPurchase = await purchase.save();
    res.json(updatedPurchase);
});

// @desc    Delete a purchase request
// @route   DELETE /api/purchases/:id
// @access  Protected (Super Admin only)
const deletePurchase = asyncHandler(async (req, res) => {
    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
        res.status(404);
        throw new Error("Purchase not found");
    }

    await purchase.deleteOne();
    res.json({ message: "Purchase request deleted" });
});

module.exports = {
    createPurchase,
    getPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase,
};
