const mongoose = require("mongoose");

const faultyReportSchema = new mongoose.Schema(
    {
        asset: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Asset",
            required: true,
        },
        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        issue: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Reported", "In Repair", "Resolved"],
            default: "Reported",
        },
        notes: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("FaultyReport", faultyReportSchema);
