// routes/resumeRoutes.js
const express = require("express");
const multer = require("multer");
const router = express.Router();
const resumeController = require("../controllers/resumeController");


const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("resume"), resumeController.uploadResume);
router.get("/:id", resumeController.getResumeById);
router.get("/", resumeController.getAllResumes);
router.delete('/:id', resumeController.deleteResume);


module.exports = router;