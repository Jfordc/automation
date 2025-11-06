// index.js
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// ✅ Sentiment Analyzer Endpoint
app.post("/analyze", (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: "No comment provided" });
  }

  const text = comment.toLowerCase();
  let sentiment;

  if (text.includes("good") || text.includes("great") || text.includes("maganda")) {
    sentiment = "Positive 😊";
  } else if (text.includes("bad") || text.includes("delays") || text.includes("pangit")) {
    sentiment = "Negative 😞";
  } else {
    sentiment = "Neutral 😐";
  }

  res.json({
    comment,
    sentiment,
    summary: `The comment "${comment}" seems ${sentiment}.`
  });
});

// ✅ Start the server
app.listen(3000, () => {
  console.log("✅ AI Analyzer running on port 3000");
});
