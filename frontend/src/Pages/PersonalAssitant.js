import React, { useEffect, useState } from "react";
import "../CSS/PersonalAsistant.css"; 
import Navbar from "../Components/Navbar";


const PersonalAssistant = () => {
  const [financeData, setFinanceData] = useState([]);
  const [messages, setMessages] = useState([
    { role: "user", content: "Hi there, I need some financial advice." },
  ]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/finances");
        if (!res.ok) {
          throw new Error("Network response failed");
        }
        const data = await res.json();
        setFinanceData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const sendMessage = async () => {
    setMessages([...messages, { role: "user", content: inputValue }]);
    setLoading(true);
  
    const url =
      "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "YOUR_API_KEY",
        "x-rapidapi-host":
          "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a financial advisor.",
          },
          ...messages, 
          {
            role: "user",
            content: `Here is my financial data: ${JSON.stringify(financeData)}.`, 
          },
          {
            role: "user",
            content: inputValue,
          },
        ],
        model: "gpt-4-turbo-2024-04-09",
        max_tokens: 300,
        temperature: 0.7,
      }),
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result); // Log the entire response
      if (result.choices && result.choices.length > 0) {
        const assistantResponse = result.choices[0].message.content;
        const formattedResponse = assistantResponse.replace(/[#*]/g, "").trim();
        setMessages([...messages, { role: "user", content: inputValue }, { role: "assistant", content: formattedResponse }]);
      } else {
        console.error("Unexpected API response format:", result);
      }
    } catch (error) {
      console.error("API request failed:", error);
    } finally {
      setLoading(false);
      setInputValue("");
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="assistant-container">
      <Navbar/>
      <div className="chatting-area">
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <div style={{ backgroundColor: message.role === "user" ? "#f2f2f2" : "#e0f2f1", padding: "10px", borderRadius: "5px", maxWidth: "80%" }}>
              <span style={{ fontWeight: "bold", marginRight: "5px" }}>{message.role === "user" ? "You" : "Assistant"}:</span>
              {message.content}
            </div>
          </div>
        ))}
        {loading && <div>Loading...</div>}
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
        />
        <button onClick={sendMessage} disabled={loading} className="assistant-button">Send</button>
      </div>
    </div>
  );
};

export default PersonalAssistant;