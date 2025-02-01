const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./config/db"); // Ensures DB connection logic is executed

// Routes
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes with the /api/v1 prefix
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/favourites", favouriteRoutes);
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/orders", orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// Creating Port
const PORT = process.env.PORT || 4000; // Default to 5000 if PORT is undefined
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
