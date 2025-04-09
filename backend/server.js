require("dotenv").config();


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database/database');
const userRoutes = require("./routes/userRoutes");
const app = express();
const purchaseRoutes = require("./routes/purchaseRoutes");

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
