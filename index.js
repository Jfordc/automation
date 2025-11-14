import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Custom rule-based sentiment detector
function analyzeComment(comment) {
    const text = comment.toLowerCase();

    const positiveWords = [
        "ganda", "galing", "maganda", "mabait", "good", "great", "ayos",
        "ok", "okay", "satisfied", "friendly", "helpful", "very good",
        "excellent", "perfect", "love"
    ];

    const negativeWords = [
        "panget", "bad", "worst", "sobrang bagal", "bagal", "delay",
        "madumi", "mahirap", "slow", "hate", "terrible", "poor", "angry"
    ];

    let score = 0;

    positiveWords.forEach(word => {
        if (text.includes(word)) score++;
    });

    negativeWords.forEach(word => {
        if (text.includes(word)) score--;
    });

    let sentiment = "Neutral 😐";
    let analysisText = "Neutral — user feedback is mixed or balanced.";

    if (score > 0) {
        sentiment = "Positive 😊";
        analysisText = "Positive — user expresses satisfaction or appreciation.";
    } else if (score < 0) {
        sentiment = "Negative 😡";
        analysisText = "Negative — user expresses frustration or dissatisfaction.";
    }

    return `Analysis: ${analysisText}`;
}

app.post("/analyze", (req, res) => {
    if (!req.body.comment) {
        return res.status(400).json({ error: "No comment provided" });
    }

    const comment = req.body.comment;
    const result = analyzeComment(comment);

    res.json({
        comment,
        analysis: result
    });
});

app.listen(3000, () => {
    console.log("AI Analyzer running on port 3000");
});
