import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// 🧠 Sentiment Analyzer Endpoint
app.post("/analyze", (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: "No comment provided" });
  }

  const text = comment.toLowerCase();
  let analysis = "";
  let sentiment = "";

  if (
    text.includes("good") ||
    text.includes("great") ||
    text.includes("excellent") ||
    text.includes("maganda") ||
    text.includes("ayos") ||
    text.includes("mabuti")
  ) {
    sentiment = "Positive";
    analysis = "Positive — user expresses satisfaction and praise.";
  } else if (
    text.includes("bad") ||
    text.includes("slow") ||
    text.includes("pangit") ||
    text.includes("madumi") ||
    text.includes("delays") ||
    text.includes("problem")
  ) {
    sentiment = "Negative";
    analysis = "Negative — user is frustrated or dissatisfied with the service.";
  } else {
    sentiment = "Neutral";
    analysis = "Neutral — user feedback is mixed or balanced.";
  }

  res.json({
    comment,
    sentiment,
    analysis,
    summary: `Analysis: ${analysis}`,
  });
});

// ✅ Start the server
app.listen(3000, () => {
  console.log("✅ AI Analyzer running on port 3000");
});
