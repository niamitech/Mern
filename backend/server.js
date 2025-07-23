const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const abTestRoutes = require("./routes/abTestRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/abtest", abTestRoutes);

mongoose
  .connect("mongodb://localhost:27017/leads")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server started on port 5000"));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
