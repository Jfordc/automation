import express from "express";
import Sentiment from "sentiment";

const app = express();
app.use(express.json());

const sentiment = new Sentiment();

// Add custom Tagalog/Taglish words
const customWords = {
  maganda: 3,
  mabuti: 3,
  ayos: 2,
  maayos: 2,
  bilis: 3,
  panget: -3,
  mabagal: -2,
  madumi: -2,
  nakakainis: -3,
  delays: -2
};

app.post("/analyze", (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: "No comment provided" });
  }

  // Analyze sentiment with custom words
  const result = sentiment.analyze(comment, { extras: customWords });

  // Determine label
  let sentimentLabel = "Neutral 😐";
  if (result.score > 1) sentimentLabel = "Positive 😊";
  else if (result.score < -1) sentimentLabel = "Negative 😞";

  res.json({
    comment,
    sentiment: sentimentLabel,
    analysis: `**Analysis:** ${sentimentLabel} — AI detected sentiment score ${result.score}.`
  });
});

app.listen(3000, () => {
  console.log("✅ AI Analyzer running on port 3000");
});
