
# Notecaster - Lecture Audio To Text Notes

Welcome to the Audio Transcription Application! This project allows users to upload audio files through a React frontend, which are then processed by a Node.js backend using the OpenAI Whisper model. The application transcribes the audio and returns the transcription to the user.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Upload audio files through a simple React-based frontend.
- Transcribe audio using OpenAI's Whisper model.
- Display the transcription on the frontend.
- Easy setup and deployment.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- OpenAI API Key (for using OpenAI's Whisper model)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/audio-transcription-app.git
cd audio-transcription-app
```

### 2. Install Dependencies

Navigate to the backend directory and install the dependencies:

```bash
cd whisper-transcription-api
npm install
```

Navigate to the frontend directory and install the dependencies:

```bash
cd ../whisper-frontend
npm install
```

## Configuration

### Backend Configuration

1. Create a `.env` file in the `whisper-transcription-api` directory:

   ```bash
   cd ../whisper-transcription-api
   touch .env
   ```

2. Add your OpenAI API key to the `.env` file:

   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Running the Application

### 1. Start the Backend Server

Navigate to the `whisper-transcription-api` directory and start the server:

```bash
cd whisper-transcription-api
node index.js
```

The backend server will start on `http://localhost:5000`.

### 2. Start the Frontend Development Server

In a new terminal, navigate to the `whisper-frontend` directory and start the React development server:

```bash
cd whisper-frontend
npm start
```

The frontend will start on `http://localhost:3000`.

### 3. Access the Application

Open your browser and navigate to `http://localhost:3000`. You should see the application interface where you can upload an audio file and receive the transcription.

## Usage

### Uploading an Audio File

1. Click on the "Choose File" button to select an audio file from your computer.
2. Click on the "Upload" button to send the file to the backend for transcription.
3. The transcription will be displayed below the upload section once the processing is complete.

### Supported Audio Formats

- MP3
- WAV
- FLAC
- OGG

## Project Structure

```bash
audio-transcription-app/
├── whisper-frontend/       # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   ├── public/              # Public assets
│   ├── package.json         # Frontend dependencies and scripts
│   └── README.md            # Frontend README
├── whisper-transcription-api/  # Node.js backend
│   ├── uploads/             # Uploaded audio files (temporary storage)
│   ├── index.js             # Main backend server
│   ├── package.json         # Backend dependencies and scripts
│   └── .env                 # Environment variables (API keys, etc.)
└── README.md                # Project README
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Submit a pull request.

