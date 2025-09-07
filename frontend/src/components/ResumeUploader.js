// ResumeUploader.js
import React, { useState } from 'react';
import { uploadResume } from '../services/api';
import { Button, Input, Card, Subtitle } from '../theme/GlobalStyles';

const ResumeUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert('Please select a PDF file!');
    
    const formData = new FormData();
    formData.append('resume', file);
    setLoading(true);
    
    try {
      const response = await uploadResume(formData);
      onUploadSuccess(response.data);
      setFile(null);
      alert('Resume uploaded and analyzed successfully!');
    } catch (err) {
      alert('Upload failed! Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Subtitle>Upload Your Resume</Subtitle>
      <p style={{ marginBottom: '1rem', color: '#ccc' }}>
        Upload a PDF resume to analyze and get AI-powered feedback
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ padding: '0.5rem' }}
        />
        
        <Button 
          onClick={handleUpload} 
          disabled={loading || !file}
          style={{ minWidth: '150px' }}
        >
          {loading ? 'Analyzing...' : 'Upload Resume'}
        </Button>
      </div>
      
      {file && (
        <p style={{ marginTop: '1rem', color: '#4ecdc4' }}>
          Selected: {file.name}
        </p>
      )}
    </div>
  );
};

export default ResumeUploader;