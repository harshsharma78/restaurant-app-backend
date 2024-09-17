const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

dotenv.config(".env");

// DB Connection
connectDb();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send(`<h1>Welcome to the restaurant's server</h1>`);
});

// Server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`.bgWhite);
});
