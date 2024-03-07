const ElevenLabs = require("elevenlabs-node");
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/convert', (req, res) => {
    const textInput = req.body.textInput;
    const voice = new ElevenLabs({
        apiKey:  process.env.API_KEY,
        voiceId: process.env.VOICE_ID,
    });
    
    voice.textToSpeech({
        fileName:        "public/audio.mp3",
        textInput:       `${textInput}`,
        voiceId:         process.env.VOICE_ID,
        stability:       0.5,
        similarityBoost: 0.5,
        modelId:         "eleven_multilingual_v2",
        style:           1,
        speakerBoost:    true
    }).then(() => {
        res.json({ audioFilePath: '/audio.mp3' });
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

