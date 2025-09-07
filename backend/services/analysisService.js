const pdfParse = require("pdf-parse");

async function analyzeResume(fileBuffer) {

  const data = await pdfParse(fileBuffer);
  const text = data.text;


  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
  const phoneMatch = text.match(/\+?\d{10,15}/);

  const extracted = {
    name: "Naresh", 
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    skills: [], 
    summary: text.substring(0, 500) 
  };

  const rating = 6; 
  const suggestions = ["Add more technical skills", "Include projects with metrics"];

  return {
    extracted,
    rating,
    suggestions
  };
}
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

    res.json({ 
      message: "Resume analyzed & saved", 
      data: result.rows[0] 
    });

  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Resume analysis failed" });
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
    
    res.json({ 
      message: 'Resume deleted successfully', 
      deletedResume: result.rows[0] 
    });
    
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error during deletion' });
  }
  const handleDelete = async (id) => {
  console.log("Deleting resume with ID:", id);
  try {
    const response = await deleteResumeById(id);
    console.log("Delete response:", response);
    setResumes(resumes.filter(r => r.id !== id));
    alert("Resume deleted successfully!");
  } catch (err) {
    console.error("Full error object:", err);
    console.error("Error response:", err.response);
    alert("Failed to delete resume. Check console for details.");
  }
};
};
module.exports = { analyzeResume, deleteResume };
