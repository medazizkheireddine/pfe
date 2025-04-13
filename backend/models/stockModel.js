const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        currentQuantity: {
            type: Number,
            required: true,
            default: 0,
        },
        minimumThreshold: {
            type: Number,
            required: true,
            default: 1,
        },
        unit: {
            type: String, // e.g., "pcs", "units", etc.
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Stock", stockSchema);
