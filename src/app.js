const express = require("express");
const sheetsRoutes = require("./routes/sheets.route");
const errorMiddleware = require("./middlewares/errors.middleware");

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use("/api", sheetsRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
