const express = require("express");
const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    registerUser,
    loginUser//
} = require("../controllers/userControllers");

const { protect, superAdminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Add User Registration Route
router.post("/register", registerUser);

// Get all users (Super Admin only)
router.get("/", protect, superAdminOnly, getUsers);

// Get a single user by ID (Admin & Super Admin)
router.get("/:id", protect, getUserById);

// Update user (Admin & Super Admin)
router.put("/:id", protect, updateUser);

// Delete user (Super Admin only)
router.delete("/:id", protect, superAdminOnly, deleteUser);
// Register a new user
router.post("/register", registerUser);

// Login user & get token
router.post("/login", loginUser);


module.exports = router;
