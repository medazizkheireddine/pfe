const asyncHandler = require("express-async-handler");
const Stock = require("../models/stockModel");

// @desc    Create a new stock record
// @route   POST /api/stock
// @access  Protected (Admin or Super Admin)
const createStockRecord = asyncHandler(async (req, res) => {
    const { itemName, category, currentQuantity, minimumThreshold, unit } = req.body;

    if (!itemName || !category) {
        res.status(400);
        throw new Error("Item name and category are required.");
    }

    const newStock = await Stock.create({
        itemName,
        category,
        currentQuantity: currentQuantity || 0,
        minimumThreshold: minimumThreshold || 1,
        unit,
    });

    res.status(201).json(newStock);
});

// @desc    Get all stock records
// @route   GET /api/stock
// @access  Protected (Admin or Super Admin)
const getStockRecords = asyncHandler(async (req, res) => {
    const stocks = await Stock.find();
    res.json(stocks);
});

// @desc    Get a stock record by ID
// @route   GET /api/stock/:id
// @access  Protected (Admin or Super Admin)
const getStockById = asyncHandler(async (req, res) => {
    const stock = await Stock.findById(req.params.id);
    if (stock) {
        res.json(stock);
    } else {
        res.status(404);
        throw new Error("Stock record not found");
    }
});

// @desc    Update a stock record
// @route   PUT /api/stock/:id
// @access  Protected (Admin or Super Admin)
const updateStock = asyncHandler(async (req, res) => {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
        res.status(404);
        throw new Error("Stock record not found");
    }

    stock.itemName = req.body.itemName || stock.itemName;
    stock.category = req.body.category || stock.category;
    stock.currentQuantity = req.body.currentQuantity !== undefined ? req.body.currentQuantity : stock.currentQuantity;
    stock.minimumThreshold = req.body.minimumThreshold !== undefined ? req.body.minimumThreshold : stock.minimumThreshold;
    stock.unit = req.body.unit || stock.unit;

    const updatedStock = await stock.save();
    res.json(updatedStock);
});

// @desc    Delete a stock record
// @route   DELETE /api/stock/:id
// @access  Protected (Super Admin only)
const deleteStock = asyncHandler(async (req, res) => {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
        res.status(404);
        throw new Error("Stock record not found");
    }
    await stock.deleteOne();
    res.json({ message: "Stock record deleted successfully" });
});

module.exports = {
    createStockRecord,
    getStockRecords,
    getStockById,
    updateStock,
    deleteStock,
};
