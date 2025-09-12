const BACKEND_URL = "http://127.0.0.1:5001"; // Flask backend

import { useState, useEffect, useRef } from "react";
import { FaRedo } from "react-icons/fa";
import "./Chatbot.css";

const introPhrases = [
  "Great! Let’s take the next step together.",
  "I’m here with you. Want to keep going?",
  "Let’s make this simple and clear together.",
  "Here’s something that might really help.",
  "Want to explore this a bit more?",
  "Can I show you something helpful?",
  "Let me walk you through this.",
  "You’re on the right track. Want to go deeper?",
  "Let’s make this easier together.",
  "I’ve got something useful for you.",
  "Shall we dive into the next part?",
  "Let’s stay safe and smart. Want to hear more?",
  "I’ve got your back. Want to take a closer look?",
  "This might be useful — shall we explore it?",
  "Let’s walk through it step by step.",
  "Here’s something that could make things clearer.",
  "I’ve got a tip that might make this easier.",
  "You're doing great — ready for the next tip?",
  "Let’s take this one step further."
];

function cleanStudentFollowUp(text) {
  let cleaned = text;
  introPhrases.forEach((phrase) => {
    const rx = new RegExp("^" + phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    cleaned = cleaned.replace(rx, "").trim();
  });

  const offerPatterns = [
    /\b(Can|May|Shall|Should|Would|Will|what|sign)\s+I\s+(share|give|guide|show|help|offer|should|tell|explain|make|like)\s+you\b/i,
    /\bCan I help you\b/i,
    /\bcan I show you\b/i,
    /\bcan I share you\b/i,
    /\bcan I share \b/i,
    /\bcan I guide you\b/i,
    /\bMay I help you\b/i,
    /\bMay share you\b/i,
    /\bwould like to help you\b/i,
    /\bwill like to help you\b/i,
    /\bwhat signs tell you\b/i,
    /\bwhat should you do if you're\b/i,
    /\bLet me\b/i,
    /\bI have\b.*\byou\b/i
  ];

  const isOffer = offerPatterns.some(rx => rx.test(cleaned));

  if (isOffer) {
    cleaned = cleaned
      .replace(/\bCan I help you\b/gi, "Can you help me")
      .replace(/\bCan I show you\b/gi, "Can you show me")
      .replace(/\bCan I guide you\b/gi, "Can you guide me")
      .replace(/\bMay I share you\b/gi, "May you share me")
      .replace(/\bMay I help you\b/gi, "May you help me")
      .replace(/\bwould like to help you\b/gi, "would you like to help me")
      .replace(/\bwill like to help you\b/gi, "will you like to help me")
      .replace(/\bWhat signs tell you\b/gi, "what signs tell me")
      .replace(/\bWhat should you do if you're\b/gi, "what should I do if I'am")
      .replace(/\bI\b/g, "you")
      .replace(/\bmy\b/g, "your")
      .replace(/\bMy\b/g, "Your")
      .replace(/\byour\b/g, "my")
      .replace(/\bYour\b/g, "My")
      .replace(/\bwe\b/g, "we")
      .replace(/\byourself\b/g, "myself")
      .replace(/\bmyself\b/g, "yourself")
      .replace(/\byou're\b/g, "I'am")
      .replace(/\byou've\b/g, "I've")
      .replace(/\byou'll\b/g, "I'll");
  } else {
    cleaned = cleaned
      .replace(/\bCan you\b/gi, "Can I")
      .replace(/\bMay you\b/gi, "May I")
      .replace(/\bShall you\b/gi, "Shall I")
      .replace(/\bshould you\b/gi, "should I")
      .replace(/\bWould you\b/gi, "Would I")
      .replace(/\bI\b/g, "you")
      .replace(/\byou\b/g, "I")
      .replace(/\bYou\b/g, "I")
      .replace(/\bme\b/g, "me")
      .replace(/\byour\b/g, "my")
      .replace(/\bYour\b/g, "My")
      .replace(/\bwe\b/g, "we")
      .replace(/\byourself\b/g, "myself")
      .replace(/\bmyself\b/g, "yourself")
      .replace(/\byou're\b/g, "I'am")
      .replace(/\byou've\b/g, "I've");
  }

  return cleaned;
}

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! I'm DisastraBot, your disaster assistance companion. I'm here to help you with emergency information, safety tips, and disaster preparedness. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [isSending, setIsSending] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [lastFollowUp, setLastFollowUp] = useState(null);

  const chatboxRef = useRef(null);

  const checkServer = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/ping`);
      const data = await res.json();
      console.log("Server check:", data);
    } catch (error) {
      console.error("Backend not reachable ❌", error);
    }
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const refreshChat = () => {
    setMessages([
      {
        role: "bot",
        text: "Hello! I'm DisastraBot, your disaster assistance companion. I'm here to help you with emergency information, safety tips, and disaster preparedness. How can I assist you today?",
      },
    ]);
    setInput("");
    setLastFollowUp(null);
  };

  const handleFollowUp = (text) => {
    const cleaned = cleanStudentFollowUp(text);
    sendMessage(cleaned);
  };

  const sendMessage = async (override = null) => {
    if (isSending) return;

    const message = override || input.trim();
    const normalized = message.toLowerCase();
    if (!message) return;

    const affirmatives = ["yes", "okay", "sure", "ok", "yep", "yeah"];
    const negatives = ["no", "not now", "maybe later", "nah", "nope", "cancel"];

    if (affirmatives.includes(normalized)) {
      setMessages((prev) => [...prev, { role: "student", text: message }]);
      if (lastFollowUp) {
        setTimeout(() => handleFollowUp(lastFollowUp), 100);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "Thanks for confirming. Let me know if you need help with anything else.",
          },
        ]);
      }
      return;
    }

    if (negatives.includes(normalized)) {
      setMessages((prev) => [...prev, { role: "student", text: message }]);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Thanks for your response. Feel free to ask me anything else.",
        },
      ]);
      return;
    }

    setMessages((prev) => [...prev, { role: "student", text: message }]);
    setIsSending(true);
    setIsThinking(true);
    setInput("");

    try {
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Connection": "keep-alive",
        },
        body: JSON.stringify({ message, language }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const contentType = res.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid JSON response from server");
      }

      const data = await res.json();

      const responseText =
        typeof data.response === "string"
          ? data.response
          : JSON.stringify(data.response);

      const lines = responseText.split("\n").filter((line) => line.trim());

      const formatted =
        lines.length > 1
          ? lines.map((line) => line.replace(/^\d+\.\s*/, "🔹 ").trim()).join("\n")
          : responseText;

      setMessages((prev) => [...prev, { role: "bot", text: formatted }]);

      if (data.followup) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "bot-followup", text: data.followup },
          ]);
          setLastFollowUp(data.followup);
        }, 400);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `⚠️ Something went wrong: ${err.message}`,
        },
      ]);
    } finally {
      setIsSending(false);
      setIsThinking(false);
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <span>DisastraBot 🤖 - Your Friend In Disaster Situation 🤝</span>
        <div className="chat-header-tools">
          <button
            className="header-btn"
            onClick={refreshChat}
            title="Refresh chat"
          >
            <FaRedo />
          </button>
        </div>
      </div>

      <div className="chat-box" ref={chatboxRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${
              msg.role === "bot"
                ? "bot"
                : msg.role === "bot-followup"
                ? "bot follow-up"
                : "student"
            }`}
          >
            {msg.role === "bot-followup" ? (
              <p>
                💡{" "}
                <span className="clickable" onClick={() => handleFollowUp(msg.text)}>
                  {msg.text}
                </span>
              </p>
            ) : msg.text.includes("\n") ? (
              <ul>
                {msg.text.split("\n").map((line, index) => (
                  <li key={index}>{line.trim()}</li>
                ))}
              </ul>
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}
        {isThinking && (
          <div className="message bot thinking">
            <p>💬 DisastraBot is thinking...</p>
          </div>
        )}
      </div>

      <div className="chat-input">
        <select
          id="language"
          title="Select your preferred language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Language selection"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
          <option value="mr">Marathi</option>
          <option value="gu">Gujarati</option>
          <option value="kn">Kannada</option>
          <option value="ml">Malayalam</option>
          <option value="or">Odia</option>
          <option value="pa">Punjabi</option>
          <option value="as">Assamese</option>
          <option value="ur">Urdu</option>
        </select>

        <input
          id="userInput"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your question..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={() => sendMessage()}
          disabled={isSending}
          title="Send your message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="send-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
