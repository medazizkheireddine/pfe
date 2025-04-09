const mongoose = require('mongoose');

const purchaseRequestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
    },
    items: [
        {
            name: String,
            quantity: Number,
            unitPrice: Number,
        },
    ],
    totalCost: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('PurchaseRequest', purchaseRequestSchema);
