import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setTranscription(''); // Clear previous transcription
    setError(''); // Clear previous errors
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('audio', file);

    try {
      // Start the upload and transcription process
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTranscription(response.data.transcription); // Display the transcription
      console.log(`[${new Date().toISOString()}] Transcription received for: ${file.name}`);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] Error uploading file: ${file.name}`, err.message);
      setError('Failed to process the file. Please try again.');
    }
  };

  return (
    <div>
      <h2>Upload Audio File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
