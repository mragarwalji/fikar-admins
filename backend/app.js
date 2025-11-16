require("dotenv").config(); 
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");


// middleware
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://fikar-admins.onrender.com",
      "https://fikar-admin.web.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

// MongoDB — from environment variable
const uri = process.env.MONGO_URI;

// Connect DB
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB Connected Successfully to FikarPlus Database");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to Fikar Plus Backend Server!');
});

// Server Running
app.listen(port, () => {
  console.log(`Fikar Plus Server is running on port ${port}`);
});
