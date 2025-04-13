const asyncHandler = require("express-async-handler");
const Asset = require("../models/assetModel");

// @desc    Create a new asset
// @route   POST /api/assets
// @access  Protected (Admin or Super Admin)
const createAsset = asyncHandler(async (req, res) => {
    const { name, category, brand, serialNumber, purchaseDate } = req.body;

    if (!name || !category || !serialNumber) {
        res.status(400);
        throw new Error("Please provide required fields (name, category, serialNumber)");
    }

    const asset = await Asset.create({
        name,
        category,
        brand,
        serialNumber,
        purchaseDate,
    });

    res.status(201).json(asset);
});

// @desc    Get all assets
// @route   GET /api/assets
// @access  Protected (Admin and Super Admin)
const getAssets = asyncHandler(async (req, res) => {
    const assets = await Asset.find().populate("assignedTo", "name email");
    res.json(assets);
});

// @desc    Get an asset by ID
// @route   GET /api/assets/:id
// @access  Protected (Admin and Super Admin)
const getAssetById = asyncHandler(async (req, res) => {
    const asset = await Asset.findById(req.params.id).populate("assignedTo", "name email");
    if (asset) {
        res.json(asset);
    } else {
        res.status(404);
        throw new Error("Asset not found");
    }
});

// @desc    Update an asset
// @route   PUT /api/assets/:id
// @access  Protected (Admin and Super Admin)
const updateAsset = asyncHandler(async (req, res) => {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
        res.status(404);
        throw new Error("Asset not found");
    }

    // Update asset details — only allow updates to certain fields
    asset.name = req.body.name || asset.name;
    asset.category = req.body.category || asset.category;
    asset.brand = req.body.brand || asset.brand;
    asset.serialNumber = req.body.serialNumber || asset.serialNumber;
    asset.status = req.body.status || asset.status;
    asset.purchaseDate = req.body.purchaseDate || asset.purchaseDate;

    const updatedAsset = await asset.save();
    res.json(updatedAsset);
});

// @desc    Delete an asset
// @route   DELETE /api/assets/:id
// @access  Protected (Super Admin only)
const deleteAsset = asyncHandler(async (req, res) => {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
        res.status(404);
        throw new Error("Asset not found");
    }

    await asset.deleteOne();
    res.json({ message: "Asset deleted successfully" });
});

// @desc    Assign an asset to a user
// @route   PUT /api/assets/:id/assign
// @access  Protected (Admin and Super Admin)
const assignAsset = asyncHandler(async (req, res) => {
    const { userId } = req.body; // Expecting a user ID in the request body

    const asset = await Asset.findById(req.params.id);
    if (!asset) {
        res.status(404);
        throw new Error("Asset not found");
    }

    asset.assignedTo = userId;
    asset.status = "assigned";

    const updatedAsset = await asset.save();
    res.json(updatedAsset);
});

module.exports = {
    createAsset,
    getAssets,
    getAssetById,
    updateAsset,
    deleteAsset,
    assignAsset,
};
