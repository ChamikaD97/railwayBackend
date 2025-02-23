const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors()); // Use the default CORS middleware first
app.use(bodyParser.json());

// Custom CORS configuration (if you need more control)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(); // Proceed to the next middleware
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
const engineRoutes = require("./routes/engineRoutes");
const classEngineRoutes = require("./routes/classEngineRoutes");
const userRoutes = require("./routes/userRoutes");
const failureRoutes = require("./routes/failureRoutes");
const engineFailures = require("./routes/engineFailures");
const tripCards = require("./routes/tripCardRoutes");

const inspectionRoute = require("./routes/inspectionRoutes");

app.use("/api/engines", engineRoutes);
app.use("/api/classEngines", classEngineRoutes);
app.use("/api/user", userRoutes);
app.use("/api/failures", failureRoutes);
app.use("/api/engineFailures", engineFailures);

app.use("/api/tripCards", tripCards);
app.use("/api/inspections", inspectionRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
