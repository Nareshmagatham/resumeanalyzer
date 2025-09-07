// PastResumesTable.js
import React from "react";
import { deleteResumeById } from "../services/api";
import { Table, DangerButton, SecondaryButton } from "../theme/GlobalStyles";

const PastResumesTable = ({ resumes, fetchResumes, onViewDetails }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    
    try {
      await deleteResumeById(id);
      await fetchResumes();
      alert("Resume deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete resume");
    }
  };

  if (resumes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        <h3>No resumes uploaded yet</h3>
        <p>Upload your first resume to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1rem', color: '#4ecdc4' }}>Resume History</h2>
      
      <div style={{ overflowX: 'auto' }}>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Uploaded At</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map(resume => (
              <tr key={resume.id}>
                <td>{resume.name || "N/A"}</td>
                <td>{resume.email || "N/A"}</td>
                <td>{resume.uploaded_at ? new Date(resume.uploaded_at).toLocaleString() : "N/A"}</td>
                <td>
                  {resume.resume_rating ? (
                    <span style={{ 
                      color: resume.resume_rating >= 7 ? '#4ecdc4' : resume.resume_rating >= 5 ? '#ffa726' : '#ff6b6b',
                      fontWeight: 'bold'
                    }}>
                      ⭐ {resume.resume_rating}/10
                    </span>
                  ) : "N/A"}
                </td>
                <td>
                  <SecondaryButton onClick={() => onViewDetails(resume.id)}>
                    Details
                  </SecondaryButton>
                  <DangerButton onClick={() => handleDelete(resume.id)}>
                    Delete
                  </DangerButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PastResumesTable;