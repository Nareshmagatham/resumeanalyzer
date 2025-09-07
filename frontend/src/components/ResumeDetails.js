// ResumeDetails.js
import React from 'react';
import { Card, Subtitle } from '../theme/GlobalStyles';

const ResumeDetails = ({ data }) => {
  if (!data) return (
    <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
      <h3>Select a resume to view details</h3>
      <p>Click on "Details" next to any resume in the table</p>
    </div>
  );

  const ratingColor = data.resume_rating >= 7 ? '#4ecdc4' : data.resume_rating >= 5 ? '#ffa726' : '#ff6b6b';

  return (
    <Card>
      <Subtitle>Resume Analysis Details</Subtitle>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
        
  
        <div>
          <h3 style={{ color: '#667eea', marginBottom: '1rem' }}> Basic Information</h3>
          <p><strong>Name:</strong> {data.name || "N/A"}</p>
          <p><strong>Email:</strong> {data.email || "N/A"}</p>
          <p><strong>Phone:</strong> {data.phone || "N/A"}</p>
          <p><strong>Uploaded:</strong> {new Date(data.uploaded_at).toLocaleString()}</p>
        </div>

        {/* Rating */}
        <div>
          <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>⭐ Rating & Feedback</h3>
          <p><strong>Overall Rating:</strong> 
            <span style={{ color: ratingColor, fontWeight: 'bold', marginLeft: '0.5rem' }}>
              {data.resume_rating || "N/A"}/10
            </span>
          </p>
          
          <div style={{ marginTop: '1rem' }}>
            <strong>Improvement Areas:</strong>
            <p style={{ color: '#ccc', marginTop: '0.5rem' }}>
              {data.improvement_areas || "No specific improvement areas identified"}
            </p>
          </div>
        </div>

     
        <div style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Summary</h3>
          <div style={{ 
            background: 'rgba(40, 40, 40, 0.6)', 
            padding: '1rem', 
            borderRadius: '8px',
            borderLeft: '4px solid #667eea'
          }}>
            {data.summary || "No summary available"}
          </div>
        </div>

      </div>
    </Card>
  );
};

export default ResumeDetails;