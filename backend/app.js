const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");


// middleware
app.use(
  cors({
    origin: ["http://localhost:8080", "https://fikar-admins.onrender.com", "https://fikar-admin.web.app"], // allow multiple origins
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use your routes
app.use("/api/auth", authRoutes);


// MongoDB Fikar plus database connection
const uri = "mongodb+srv://krishagarwal8962_db_user:0prSSZVqnROUrOoC@cluster0.0jvbowr.mongodb.net/fikarplus?retryWrites=true&w=majority&appName=Cluster0";


// Connect to fikar plus mongodb database
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB Connected Successfully to FikarPlus Database")
})
  .catch((err) => {
    console.error("MongoDB Connection Error:", err)
});

app.get('/', (req, res) => {
    res.send('Welcome to Fikar Plus Backend Server!');
})


// server running
app.listen(port, () => {
    console.log(`Fikar Plus Server is running on http://localhost:${port}`);
});