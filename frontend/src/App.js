// App.js
import React, { useEffect, useState } from 'react';
import ResumeUploader from './components/ResumeUploader';
import PastResumesTable from './components/PastResumesTable';
import ResumeDetails from './components/ResumeDetails';
import { getAllResumes, getResumeById } from './services/api';
import { Container, Card, Title, Button } from './theme/GlobalStyles'; // Added Button import

function App() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await getAllResumes();
      setResumes(response.data);
    } catch (err) {
      console.error("Failed to fetch resumes:", err);
    }
  };

  const handleUploadSuccess = (newResume) => {
    setResumes((prev) => [newResume.data, ...prev]);
    setActiveTab('history');
  };

  const handleViewDetails = async (id) => {
    try {
      const response = await getResumeById(id);
      setSelectedResume(response.data);
    } catch (err) {
      console.error("Error fetching resume details:", err);
    }
  };

  return (
    <Container>
      <Title>Resume Analyzer Pro</Title>
      
    
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <Button 
          onClick={() => setActiveTab('upload')}
          style={{ 
            background: activeTab === 'upload' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#333',
            border: activeTab === 'upload' ? '1px solid #667eea' : '1px solid #444'
          }}
        >
          Upload Resume
        </Button>
        <Button 
          onClick={() => setActiveTab('history')}
          style={{ 
            background: activeTab === 'history' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#333',
            border: activeTab === 'history' ? '1px solid #667eea' : '1px solid #444'
          }}
        >
          Resume History
        </Button>
      </div>

      {activeTab === 'upload' && (
        <Card>
          <ResumeUploader onUploadSuccess={handleUploadSuccess} />
        </Card>
      )}

      {activeTab === 'history' && (
        <>
          <Card>
            <PastResumesTable 
              resumes={resumes} 
              fetchResumes={fetchResumes}
              onViewDetails={handleViewDetails} 
            />
          </Card>
          
          {selectedResume && (
            <Card>
              <ResumeDetails data={selectedResume} />
            </Card>
          )}
        </>
      )}
    </Container>
  );
}

export default App;