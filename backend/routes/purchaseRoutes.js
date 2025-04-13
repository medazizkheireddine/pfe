const express = require("express");
const {
    createPurchase,
    getPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase,
} = require("../controllers/purchaseController");
//test
console.log(createPurchase);
console.log("createPurchase:", createPurchase);
console.log("getPurchases:", getPurchases);
console.log("getPurchaseById:", getPurchaseById);
console.log("updatePurchase:", updatePurchase);
console.log("deletePurchase:", deletePurchase);
const { protect, adminOnly, superAdminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new purchase request (Admins or Super Admin can create)
router.post("/", protect, adminOnly, createPurchase);

// Get all purchase requests
router.get("/", protect, adminOnly, getPurchases);

// Get purchase by id
router.get("/:id", protect, adminOnly, getPurchaseById);

// Update purchase request (e.g., approve/reject)
router.put("/:id", protect, adminOnly, updatePurchase);

// Delete purchase request (only Super Admin)
router.delete("/:id", protect, superAdminOnly, deletePurchase);



console.log("protect:", protect);
console.log("adminOnly:", adminOnly);
console.log("superAdminOnly:", superAdminOnly);

module.exports = router;
