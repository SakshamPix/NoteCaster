import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState('');
  const [transcription, setTranscription] = useState('');
  const [fileId, setFileId] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('audio', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFileId(response.data.fileId);

      // Polling for progress updates
      const interval = setInterval(async () => {
        const progressResponse = await axios.get(`http://localhost:5000/api/progress/${fileId}`);
        setProgress(`Progress: ${progressResponse.data.progress}%`);

        if (progressResponse.data.progress === 100) {
          clearInterval(interval);
          setTranscription(response.data.transcription);
        }
      }, 1000);
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  return (
    <div>
      <h2>Upload Audio File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress && <p>{progress}</p>}
      {transcription && (
        <div>
          <h3>Transcription:</h3>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
