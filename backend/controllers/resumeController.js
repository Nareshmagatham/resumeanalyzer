// controllers/resumeController.js
const pool = require("../db");
const { analyzeResume } = require("../services/analysisService");

const uploadResume = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const analysis = await analyzeResume(fileBuffer);

    const result = await pool.query(
      `INSERT INTO resumes (file_name, email, phone, summary, resume_rating, improvement_areas) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        req.file.originalname,
        analysis.extracted.email,
        analysis.extracted.phone,
        analysis.extracted.summary,
        analysis.rating,
        analysis.suggestions.join(", "),
      ]
    );

    res.json({ message: "Resume analyzed & saved", data: result.rows[0] });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Resume analysis failed" });
  }
};

const getAllResumes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM resumes ORDER BY uploaded_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
};

const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM resumes WHERE id = $1 RETURNING *', 
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully', deletedResume: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM resumes WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Resume not found" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Fetch by ID Error:", err);
    res.status(500).json({ error: "Failed to fetch resume" });
  }
};

module.exports = { uploadResume, getAllResumes, deleteResume, getResumeById };
