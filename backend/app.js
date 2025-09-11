// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const createError = require("http-errors");

const Alert = require("./models/Alert");
const indexRouter = require("./routes/index"); // your existing routes

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173", credentials: true } });

// ✅ Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/alertsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/", indexRouter);

// ✅ Admin Alerts APIs
app.get("/api/alerts", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

app.post("/api/alerts", async (req, res) => {
  try {
    const { message, severity } = req.body;
    const newAlert = new Alert({ message, severity, timestamp: new Date() });
    await newAlert.save();

    io.emit("newAlert", newAlert); // broadcast new alert
    res.json(newAlert);
  } catch (err) {
    res.status(500).json({ error: "Failed to create alert" });
  }
});

app.delete("/api/alerts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Alert.findByIdAndDelete(id);

    io.emit("deleteAlert", id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete alert" });
  }
});

// ✅ Weather API
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "Kolkata,IN";
    const apiKey = process.env.WEATHER_API_KEY || "BCYN4FQE843WRH4Z47B8WWMSZ"; // replace with your key

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
      city
    )}?unitGroup=metric&include=events&key=${apiKey}&contentType=json`;

    const response = await fetch(url);
    const data = await response.json();

    const alerts = data.events || [];
    res.json(alerts);
  } catch (err) {
    console.error("Error fetching weather:", err);
    res.status(500).json({ error: "Failed to fetch weather alerts" });
  }
});

// ✅ Catch 404
app.use((req, res, next) => next(createError(404)));

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

module.exports = app;
