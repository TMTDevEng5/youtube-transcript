// server.js
const express = require('express');
const cors = require('cors');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
app.use(cors()); // 允許你的前端網站存取

app.get('/api/transcript', async (req, res) => {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Missing videoId' });
  }

  try {
    // 抓取逐字稿
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    res.json(transcript);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '無法獲取逐字稿，該影片可能沒有提供字幕。' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`代理伺服器運行於 port ${PORT}`));