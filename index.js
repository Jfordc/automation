import express from "express";
import Sentiment from "sentiment";

const app = express();
app.use(express.json());

// Initialize sentiment analyzer with custom words for English and Tagalog
const sentiment = new Sentiment();
const customWords = {
  // Positive
  maganda: 3,
  mabuti: 3,
  ayos: 2,
  maayos: 2,
  bilis: 3,
  awesome: 3,
  great: 3,
  friendly: 2,
  nice: 2,
  excellent: 3,
  galing: 3,
  dali: 2,

  // Negative
  panget: -3,
  mabagal: -2,
  delays: -2,
  madumi: -2,
  nakakainis: -3,
  bad: -3,
  terrible: -3,
  slow: -2,
  hindi: -2
};

// Sentiment analysis endpoint
app.post("/analyze", (req, res) => {
  const { comment } = req.body;
  if (!comment) {
    return res.status(400).json({ error: "No comment provided" });
  }

  // Analyze sentiment
  const result = sentiment.analyze(comment.toLowerCase(), { extras: customWords });

  let sentimentText = "Neutral";
  if (result.score > 0) sentimentText = "Positive";
  else if (result.score < 0) sentimentText = "Negative";

  // Create a user-friendly summary
  const summary = `**Analysis:** ${sentimentText} — user feedback is ${sentimentText === "Neutral" ? "mixed or balanced" : (sentimentText === "Positive" ? "satisfied or pleased" : "frustrated or dissatisfied")}.`;

  res.json({
    comment,
    sentiment: sentimentText,
    summary
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ AI Analyzer running on port ${PORT}`);
});
