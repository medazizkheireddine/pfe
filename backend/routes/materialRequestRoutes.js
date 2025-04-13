const express = require('express');
const {
    createMaterialRequest,
    getMaterialRequests,
    getMaterialRequestById,
    updateMaterialRequest,
    deleteMaterialRequest,
} = require('../controllers/materialRequestController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a material request (any authenticated user can submit a request)
router.post('/', protect, createMaterialRequest);

// Get all material requests (admin access only)
router.get('/', protect, adminOnly, getMaterialRequests);

// Get a specific material request by ID (admin access only)
router.get('/:id', protect, adminOnly, getMaterialRequestById);

// Update a material request (e.g., approve/reject; admin access only)
router.put('/:id', protect, adminOnly, updateMaterialRequest);

// Delete a material request (admin access only)
router.delete('/:id', protect, adminOnly, deleteMaterialRequest);

module.exports = router;
