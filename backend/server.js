require("dotenv").config();


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database/database');
const userRoutes = require("./routes/userRoutes");
const app = express();
const purchaseRoutes = require("./routes/purchaseRoutes");
const assetRoutes = require("./routes/assetRoutes");
const faultyReportRoutes = require("./routes/faultyReportRoutes");
const materialRequestRoutes = require("./routes/materialRequestRoutes");
const stockRoutes = require("./routes/stockRoutes");



// Ensure this line is placed after initializing express.json() and cors middleware.
app.use("/api/stock", stockRoutes);
app.use("/api/material-requests", materialRequestRoutes);
app.use("/api/faulty-reports", faultyReportRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/purchases", purchaseRoutes);







dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);


// Test Route
app.get("/", (req, res) => {
    res.send("✅ IT Management API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
