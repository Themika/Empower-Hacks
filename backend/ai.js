const express = require("express");
const { OpenAI } = require("openai");
const bodyParser = require("body-parser");
require("dotenv").config(); // Ensure .env is loaded

const app = express();
const port = 2000;

const apikey = "sk-kWjK_SLdigqn1nWKF-4Nqf1NRfUTUd7Ow8J3AhtMnDT3BlbkFJKfOPe_MJuJPkIpfnVm6JXakczXbqLQgf4BGqAMNF8A"; // Better to use environment variable for security


// Middleware to parse JSON requests
app.use(bodyParser.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: apikey,
});

// Route to handle OpenAI requests
app.post("/api/ask", async (req, res) => {
  const { query, financialData } = req.body;
  try {
    const prompt = `Here is the user's financial data:\n\n${financialData}\n\nThe user asked:\n\n${query}\n\nPlease provide financial advice based on this data.`;
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-0125", // Correct model name for GPT-3
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
    });
    res.json({ text: response.choices[0].text.trim() });
  } catch (error) {
    if (error.response && error.response.status === 429) {
      res
        .status(429)
        .json({ error: "Rate limit exceeded. Please try again later." });
    } else {
      console.error("OpenAI API error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
