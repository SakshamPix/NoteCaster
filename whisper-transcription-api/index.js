const express = require('express');
const multer = require('multer');
const Whisper = require('nodejs-whisper');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' }); // Uploads folder to store files

let transcriptionProgress = {}; // To store progress per file

app.post('/api/upload', upload.single('audio'), async (req, res) => {
  const filePath = path.join(__dirname, req.file.path);
  const fileId = req.file.filename;
  
  transcriptionProgress[fileId] = 0; // Initialize progress

  try {
    const whisper = new Whisper({
      model: 'base', // You can change to other models
    });

    // Send progress updates to the frontend
    whisper.on('progress', (progress) => {
      transcriptionProgress[fileId] = progress;
    });

    const transcription = await whisper.transcribe(filePath);

    // Save the transcription result
    fs.unlinkSync(filePath);
    delete transcriptionProgress[fileId]; // Remove progress tracking after completion

    res.json({ transcription });
  } catch (error) {
    res.status(500).json({ error: 'Error processing the file' });
  }
});

app.get('/api/progress/:fileId', (req, res) => {
  const { fileId } = req.params;
  const progress = transcriptionProgress[fileId] || 0;
  res.json({ progress });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
