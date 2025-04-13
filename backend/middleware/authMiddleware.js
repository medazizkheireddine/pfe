const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes (Requires token)
const protect = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

// Allow only Super Admin
const superAdminOnly = (req, res, next) => {
    if (req.user.role !== "super_admin") {
        return res.status(403).json({ message: "Access Denied" });
    }
    next();
};
const adminOnly = (req, res, next) => {
    // Check if the user is authenticated and has an admin role
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed to the next middleware
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

module.exports = { protect, superAdminOnly, adminOnly };
// debug


