require('dotenv').config();  // Load environment variables from .env

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const OpenAI = require('openai');  // Import OpenAI with the new SDK

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original name of the file
  },
});

const upload = multer({ storage: storage }); // Use the custom storage configuration

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key
});

app.post('/api/upload', upload.single('audio'), async (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  const fileId = req.file.filename;

  console.log(`[${new Date().toISOString()}] Upload received: ${fileId}`);

  try {
    console.log(`[${new Date().toISOString()}] Transcription started: ${fileId}`);

    const fileStream = fs.createReadStream(filePath);

    const response = await openai.audio.transcriptions.create({
      file: fileStream,
      model: "whisper-1",
      response_format: 'json',
      language: 'en',
    });

    const transcription = response.text;

    console.log(`[${new Date().toISOString()}] Transcription completed: ${fileId}`);

    fs.unlinkSync(filePath); // Clean up the file after processing

    res.json({ transcription });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error processing file ${fileId}:`, error.message);
    res.status(500).json({ error: 'Error processing the file' });
  }
});

app.listen(5000, () => {
  console.log(`[${new Date().toISOString()}] Server started on port 5000`);
});
