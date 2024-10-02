const express = require("express");
const app = express();
const studentsRoute = require("./routes/students");
require("dotenv").config();

// Middleware
app.use(express.json());

// Routes
app.use("/api/students", studentsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
