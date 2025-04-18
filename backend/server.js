const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require("./routes/adminRoutes");
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use('/api', userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api', jobRoutes);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Job Finder API is running!");
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("MongoDB connection failed:", err));
