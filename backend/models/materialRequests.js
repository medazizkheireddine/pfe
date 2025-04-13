const mongoose = require('mongoose');

const materialRequestSchema = new mongoose.Schema(
    {
        // Reference to the employee (user) who is making the request
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // Array of items being requested (each with a name and quantity)
        items: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
            },
        ],
        // Status of the request: Pending, Approved, Rejected, or Fulfilled
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected', 'Fulfilled'],
            default: 'Pending',
        },
        // Optional notes regarding the request
        notes: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('MaterialRequest', materialRequestSchema);
