const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            // e.g., Laptop, Monitor, Peripheral, etc.
        },
        brand: {
            type: String,
        },
        serialNumber: {
            type: String,
            unique: true,
        },
        status: {
            type: String,
            enum: ["in-stock", "assigned", "faulty", "retired"],
            default: "in-stock",
        },
        purchaseDate: {
            type: Date,
        },
        assignedTo: {
            // Reference to the User model, assigned if the asset is in use
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Asset", assetSchema);
