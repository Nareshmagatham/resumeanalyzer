// server.js
const express = require("express");
const cors = require("cors");
const resumeRoutes = require("./routes/resumeRoutes"); 

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/resumes", resumeRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});