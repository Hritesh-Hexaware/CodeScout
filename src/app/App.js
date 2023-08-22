import React, { useState, useEffect, useRef, memo } from "react";
import "./App.css";
import hexawarelogo from "../assets/Hexaware.jpg";
import { Grid, Typography, Box } from "@mui/material";
import ChatMessage from "../components/ChatMsg/ChatMessage.js";
import { fetchAnswer } from "../components/ApiHandling/Apiservice.js";
import fallbackResponses from "../components/FallbckResponse/fallbackResponses.js";
import ExplanationContainer from "../components/ExplanationCont/ExplanationContainer.js";
import TypingIndicator from "../components/Loading/Loading.js";
import FeedbackButton from "../components/FeedBack/FeedbackButton.js";
import Header from "../components/Header/Header.js";
import mixpanel from "mixpanel-browser";
import { MixpanelTracking } from "../service/mixpanel.js";

// mixpanel.init("9c06f8ddce78c52c0a15452a85f7bfc1", {
//   debug: true,
//   track_pageview: true,
//   persistence: "localStorage",
// });

const MemoizedChatMessage = memo(ChatMessage);
const ChatInput = memo(({ query, onQueryChange, onAsk }) => {
  return (
    <div>
      <div className="input-contain">
        {" "}
        <FeedbackButton />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={query}
          onChange={onQueryChange}
          maxLength="2000"
          className="input-field"
          placeholder="Type your message..."
        />

        <button type="submit" className="send-button" onClick={onAsk}>
          Ask
        </button>
      </div>
    </div>
  );
});

function App() {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [messagesToShow, setMessagesToShow] = useState(10);
  const chatContainerRef = useRef(null);
  const [mode, setMode] = useState("java");
  const editorRef = useRef(null);
  const [lastUserMessage, setLastUserMessage] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [count, setCount] = useState("");
  const [selectedFAQ, setSelectedFAQ] = useState("");
  const [data, setData] = useState({});

  const faqs = [
    {
      question: "Give me an explanation",
    },
    {
      question: "How can I reset my password?",
    },
  ];

  const handleSubmit = async (e) => {
    // mixpanel.track("submit", {
    //   query: query,
    // });
    MixpanelTracking.getInstance().querySubmit(query);
    e.preventDefault();
    if (selectedFAQ) {
      const userMessage = {
        type: "user",
        message: selectedFAQ,
      };
      const botMessage = {
        type: "bot",
        message: fallbackResponses[selectedFAQ] || fallbackResponses.default,
      };
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        userMessage,
        botMessage,
      ]);
      setSelectedFAQ("");
      setQuery("");
      return;
    } else {
      const userMessage = {
        type: "user",
        message: query, // Add the user's typed message to the chat history
      };
      setChatHistory((prevChatHistory) => [...prevChatHistory, userMessage]);
    }
    try {
      setIsBotTyping(true); // Show typing indicator

      const response = await fetchAnswer(query);
      setIsBotTyping(false); // Hide typing indicator

      setData(response.data);
      if (response.data.count);
      setLastUserMessage(query);
      MixpanelTracking.getInstance().firstDraft(response.data.data[0]);
      const userMessage = { type: "user", message: query };
      const botMessage = {
        type: "bot",
        message: response.data.answer || fallbackResponses.default,
      };

      setChatHistory((prevChatHistory) => [...prevChatHistory, botMessage]);

      setQuery("");
      setShowExplain(true);
      setShowCode(true);

      //mixpanel bot reply
      // mixpanel.track("bot reply", {
      //   response: response.data.answer,
      // });
      MixpanelTracking.getInstance().botReply(botMessage.message);
    } catch (error) {
      if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
        // Handle timeout error
        const userMessage = { type: "user", message: query };
        const botMessage = {
          type: "bot",
          message:
            "Sorry, the server took too long to respond. Please try again later.",
        };

        setChatHistory((prevChatHistory) => [...prevChatHistory, botMessage]);
      } else {
        // Handle other errors
        console.error(error);
        const fallbackResponse =
          fallbackResponses[query.toLowerCase()] ||
          "Apologies, I am unable to process your request at the moment.";
        setIsBotTyping(false);
        const botMessage = { type: "bot", message: fallbackResponse };
        setChatHistory((prevChatHistory) => [...prevChatHistory, botMessage]);
      }
      setQuery("");
    }
  };
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatHistory]);

  const handleFAQClick = (question) => {
    setSelectedFAQ(question);
    setQuery(question);
  };
  const loadMoreMessages = () => {
    setMessagesToShow((prevMessages) => prevMessages + 10);
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <img src={hexawarelogo} alt="Hexaware Logo" width={50} height={50} />
        <Typography variant="h6" component="h2" style={{ marginLeft: "10px" }}>
          Project Mentor
        </Typography>
      </Box>
      <div className="app-container">
        <div className="chat-container" ref={chatContainerRef}>
          <Header />
          <Typography variant="body1" component="div">
            FAQs 💡
          </Typography>
          <div className="floating-faqs">
            <br />
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item"
                onClick={() => handleFAQClick(faq.question)}
              >
                <Typography variant="body2" component="div">
                  {faq.question}
                </Typography>
              </div>
            ))}
          </div>
          <div className="chat-history" ref={chatContainerRef}>
            {/* Show typing indicator when bot is typing */}
            {chatHistory.slice(-messagesToShow).map((message, index) => (
              <MemoizedChatMessage
                key={index}
                type={message.type}
                message={message.message}
              />
            ))}
            {/* {chatHistory.length > messagesToShow && (
              <button onClick={loadMoreMessages}>Load More Messages</button>
            )} */}
          </div>
          {isBotTyping && <TypingIndicator />}{" "}
          <ChatInput
            query={query}
            onQueryChange={(e) => setQuery(e.target.value)}
            onAsk={handleSubmit}
          />
        </div>
        {showExplain && data.count > 0 && (
          <ExplanationContainer
            lastUserMessage={lastUserMessage}
            data={data}
            mode={mode}
          />
        )}
      </div>{" "}
    </>
  );
}
export default App;
