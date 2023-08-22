// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "./App.css";
// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-text";
// import hexawarelogo from "./Hexaware.jpg";
// import "ace-builds/src-noconflict/theme-tomorrow_night";
// import { Grid, Typography, Box, Avatar } from "@mui/material";
// import { Person as UserIcon, Android as BotIcon } from "@mui/icons-material";
// import ChatHistory from "./AceEditor";

// // import * as Constants from "./Constants";
// // var url = Constants.API_URL;

// function App() {
//   const [query, setQuery] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const chatContainerRef = useRef(null);
//   const [mode, setMode] = useState("java");
//   const editorRef = useRef(null);
//   const [showCode, setShowCode] = useState(false);
//   const [showExplain, setExplain] = useState(false);
//   const [codeResponse, setCodeResponse] = useState(null);

//   const [filename, setFilename] = useState("");
//   const [filepath, setFilepath] = useState("");
//   const [confidence, setConfidence] = useState("");
//   const [explanation, setExplanation] = useState("");
//   const [count, setCount] = useState("");
//   const [selectedFAQ, setSelectedFAQ] = useState("");
//   const faqs = [
//     {
//       question: "Give me an explanation",
//     },
//     {
//       question: "How can I reset my password?",
//     },
//   ];

//   const API_URL =
//     "https://run.mocky.io/v3/0cf8aef9-c28f-4c99-a96e-05da88215170";
//   const fallbackResponses = {
//     hello: "Hiya!",
//     "where do i find important modules ?":
//       "You can find important modules in the 'Modules' section of our documentation.",
//     default: "Apologies, I am unable to process your request at the moment.",
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (selectedFAQ) {
//       const userMessage = {
//         type: "user",
//         message: selectedFAQ,
//       };
//       const botMessage = {
//         type: "bot",
//         message: fallbackResponses[selectedFAQ] || fallbackResponses["default"],
//       };
//       setChatHistory((prevChatHistory) => [
//         ...prevChatHistory,
//         userMessage,
//         botMessage,
//       ]);
//       setSelectedFAQ("");
//       setQuery(""); // Clear the input field
//       return;
//     }

//     try {
//       const apiResponse = await axios.get(`${API_URL}${query}`);
//       const userMessage = { type: "user", message: query };
//       const botMessage = {
//         type: "bot",
//         message: apiResponse.data.answer || fallbackResponses["default"],
//       };

//       setChatHistory((prevChatHistory) => [
//         ...prevChatHistory,
//         userMessage,
//         botMessage,
//       ]);

//       setQuery(""); // Clear the input field

//       // Set the data received from the API response
//       setFilename(apiResponse.data.file_name);
//       setFilepath(apiResponse.data.source_file);
//       setConfidence(apiResponse.data.confidence);
//       setExplanation(apiResponse.data.summary);
//       setCount(apiResponse.data.count);

//       console.log(count);
//       setMode("javascript");
//       setCodeResponse(apiResponse.data.snippet);
//       setExplain(true);
//       setShowCode(true);
//     } catch (error) {
//       console.error(error);
//       const fallbackResponse =
//         fallbackResponses[query.toLowerCase()] || fallbackResponses["default"];
//       const userMessage = { type: "user", message: query };
//       const botMessage = { type: "bot", message: fallbackResponse };
//       setChatHistory((prevChatHistory) => [
//         ...prevChatHistory,
//         userMessage,
//         botMessage,
//       ]);

//       setQuery(""); // Clear the input field
//     }
//   };
//   useEffect(() => {
//     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//   }, [chatHistory]);
//   function handleFAQClick(question) {
//     setSelectedFAQ(question);
//     setQuery(question);
//   }
//   try {
//     return (
//       <>
//         <Box display="flex" alignItems="center" justifyContent="center">
//           <img src={hexawarelogo} alt="Hexaware Logo" width={50} height={50} />
//           <Typography
//             variant="h6"
//             component="h2"
//             style={{ marginLeft: "10px" }}
//           >
//             Project Mentor
//           </Typography>
//         </Box>
//         <div className="app-container">
//           <div className="chat-container">
//             <Typography variant="body1" component="div">
//               FAQs 💡
//             </Typography>
//             <div className="floating-faqs">
//               <br />
//               {faqs.map((faq, index) => (
//                 <div
//                   key={index}
//                   className="faq-item"
//                   onClick={() => handleFAQClick(faq.question)}
//                 >
//                   <Typography variant="body2" component="div">
//                     {faq.question}
//                   </Typography>
//                 </div>
//               ))}
//             </div>

//             <div className="chat-history" ref={chatContainerRef}>
//               {chatHistory.map((message, index) => (
//                 <ChatMessage
//                   key={index}
//                   type={message.type}
//                   message={message.message}
//                   // onClick={handleMessageClick}
//                 />
//               ))}
//             </div>
//             <div className="input-container">
//               <input
//                 type="text"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="input-field"
//                 placeholder="Type your message..."
//               />
//               <button
//                 type="submit"
//                 className="send-button"
//                 onClick={handleSubmit}
//               >
//                 Ask
//               </button>
//             </div>
//           </div>

//           {showExplain && (
//             <div>
//               <Grid item xs={12}>
//                 <Typography variant="body1" component="div">
//                   {filename}&nbsp;&nbsp;&nbsp; {filepath}&nbsp;&nbsp;&nbsp;{" "}
//                   {confidence};
//                 </Typography>
//               </Grid>
//               <br />
//               <Grid item xs={12}>
//                 <Typography variant="subtitle1" component="div">
//                   Explanation: {explanation}
//                 </Typography>
//               </Grid>
//               {codeResponse && (
//                 <AceEditor
//                   value={codeResponse}
//                   mode={mode}
//                   theme="tomorrow_night"
//                   readOnly={true}
//                   width="100%"
//                   placeholder="Code will be displayed here"
//                   height="400px"
//                   style={{ backgroundColor: "black", fontSize: "10px" }}
//                   setOptions={{
//                     enableBasicAutocompletion: true,
//                     enableLiveAutocompletion: true,
//                     enableSnippets: true,
//                   }}
//                 />
//               )}
//             </div>
//           )}

//           <Grid item xs={12}></Grid>
//           <div>
//             <br />
//           </div>
//         </div>
//       </>
//     );
//   } catch (error) {
//     console.error("Runtime error:", error);
//     return (
//       <div>
//         <p>Oops! Something went wrong.</p>
//         <p>Please try again later.</p>
//       </div>
//     );
//   }
// }

// function ChatMessage({ type, message, onClick }) {
//   try {
//     return (
//       <>
//         <div
//           className={`message ${
//             type === "user" ? "user-message" : "bot-message"
//           }`}
//           onClick={onClick}
//         >
//           <Box display="flex" alignItems="center">
//             {type === "user" && (
//               <Avatar>
//                 <UserIcon />
//               </Avatar>
//             )}
//             &nbsp;&nbsp;&nbsp;
//             <Typography variant="body1" component="div">
//               {message}
//             </Typography>
//             &nbsp;&nbsp;&nbsp;
//             {type === "bot" && (
//               <Avatar style={{ marginLeft: "auto" }}>
//                 <BotIcon />
//               </Avatar>
//             )}
//           </Box>
//         </div>
//       </>
//     );
//   } catch (error) {
//     console.error("Runtime error:", error);
//     return (
//       <div>
//         <p>Oops! Something went wrong.</p>
//         <p>Please try again later.</p>
//       </div>
//     );
//   }
// }

// export default App;

// Replaced the usage of handleMessageClick function in the ChatMessage component with a commented out prop. You can uncomment and provide the appropriate implementation if needed.

// Converted the handleFAQClick function to an arrow function for consistency with other arrow functions in the code.

// Replaced the usage of variant="subtitle2" with variant="subtitle1" in the Grid component for better readability.

// Removed the unused count state variable as it was not being used in the code.
// Destructuring Imports: Instead of importing all the components individually from
// Inline JSX Elements: Instead of creating a separate Typography component for FAQs, you can use JSX inline elements to simplify the code. For example:
// Inline Function in Mapping: Instead of defining a separate handleFAQClick function and passing it to the onClick event, you can use an inline function directly in the mapping. This helps reduce the LOC and improves readability. For example:
// Use Object Destructuring: Instead of accessing apiResponse.data.data[0].best multiple times, you can destructure it to a variable to simplify the code. For example:
// Use Arrow Function for Event Handlers: Instead of defining event handlers as regular functions, you can use arrow functions to preserve the lexical scope of this.
// import React, { useState, useEffect, useRef, memo } from "react";
// import "./App.css";
// import hexawarelogo from "../assets/Hexaware.jpg";
// import { Grid, Typography, Box } from "@mui/material";
// import ChatMessage from "../components/ChatMsg/ChatMessage.js";
// import CodeEditor from "../components/Codedisplay/AceEditor.js";
// // import { fetchAnswer } from "../components/ApiHandling/Apiservice.js";
// import fallbackResponses from "../components/FallbckResponse/fallbackResponses.js";
// import Findsr from "../components/Miscellenious/Findsr.js";
// import axios from "axios";
// import * as Constants from "../utils/Constants.js";
// const MemoizedChatMessage = memo(ChatMessage);
// const ChatInput = memo(({ query, onQueryChange, onAsk }) => {
//   return (
//     <div className="input-container">
//       <input
//         type="text"
//         value={query}
//         onChange={onQueryChange}
//         className="input-field"
//         placeholder="Type your message..."
//       />
//       <button type="submit" className="send-button" onClick={onAsk}>
//         Ask
//       </button>
//     </div>
//   );
// });

// function App() {
//   const [query, setQuery] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [messagesToShow, setMessagesToShow] = useState(10);
//   const chatContainerRef = useRef(null);
//   const [mode, setMode] = useState("java");
//   const editorRef = useRef(null);
//   const [showCode, setShowCode] = useState(false);
//   const [showExplain, setShowExplain] = useState(false);
//   const [answer, setAnswer] = useState(null);
//   const [count, setCount] = useState("");
//   const [selectedFAQ, setSelectedFAQ] = useState("");
//   const [data, setData] = useState({});

//   const faqs = [
//     {
//       question: "Give me an explanation",
//     },
//     {
//       question: "How can I reset my password?",
//     },
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (selectedFAQ) {
//       const userMessage = {
//         type: "user",
//         message: selectedFAQ,
//       };
//       const botMessage = {
//         type: "bot",
//         message: fallbackResponses[selectedFAQ] || fallbackResponses.default,
//       };
//       setChatHistory((prevChatHistory) => [
//         ...prevChatHistory,
//         userMessage,
//         botMessage,
//       ]);
//       setSelectedFAQ("");
//       setQuery("");
//       return;
//     }

//     try {
//       const apiResponse = await axios.get(`${Constants.API_URL}${query}`);
//       setData(apiResponse.data);

//       const userMessage = { type: "user", message: query };
//       const botMessage = {
//         type: "bot",
//         message: data.answer || fallbackResponses.default,
//       };

//       setChatHistory((prevChatHistory) => [
//         ...prevChatHistory,
//         userMessage,
//         botMessage,
//       ]);

//       setQuery("");
//       const best = apiResponse.data;
//       setAnswer({
//         filename: best.file_name,
//         filepath: best.source_file,
//         confidence: best.confidence,
//         explanation: best.summary,
//         count: apiResponse.data.count,
//         codeResponse: best.snippet,
//       });
//       setShowExplain(true);
//       setShowCode(true);
//     } catch (error) {
//       console.error(error);
//       const fallbackResponse =
//         fallbackResponses[query.toLowerCase()] || fallbackResponses.default;
//       const userMessage = { type: "user", message: query };
//       const botMessage = { type: "bot", message: fallbackResponse };
//       setChatHistory((prevChatHistory) => [
//         ...prevChatHistory,
//         userMessage,
//         botMessage,
//       ]);
//       setQuery("");
//     }
//   };

//   useEffect(() => {
//     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//   }, [chatHistory]);

//   const handleFAQClick = (question) => {
//     setSelectedFAQ(question);
//     setQuery(question);
//   };

//   const loadMoreMessages = () => {
//     setMessagesToShow((prevMessages) => prevMessages + 10);
//   };

//   return (
//     <>
//       <Box display="flex" alignItems="center" justifyContent="center">
//         <img src={hexawarelogo} alt="Hexaware Logo" width={50} height={50} />
//         <Typography variant="h6" component="h2" style={{ marginLeft: "10px" }}>
//           Project Mentor
//         </Typography>
//       </Box>
//       <div className="app-container">
//         <div className="chat-container">
//           <Typography variant="body1" component="div">
//             FAQs 💡
//           </Typography>
//           <div className="floating-faqs">
//             <br />
//             {faqs.map((faq, index) => (
//               <div
//                 key={index}
//                 className="faq-item"
//                 onClick={() => handleFAQClick(faq.question)}
//               >
//                 <Typography variant="body2" component="div">
//                   {faq.question}
//                 </Typography>
//               </div>
//             ))}
//           </div>

//           <div className="chat-history" ref={chatContainerRef}>
//             {chatHistory.slice(-messagesToShow).map((message, index) => (
//               <MemoizedChatMessage
//                 key={index}
//                 type={message.type}
//                 message={message.message}
//               />
//             ))}

//             {chatHistory.length > messagesToShow && (
//               <button onClick={loadMoreMessages}>Load More Messages</button>
//             )}
//           </div>

//           <ChatInput
//             query={query}
//             onQueryChange={(e) => setQuery(e.target.value)}
//             onAsk={handleSubmit}
//           />
//         </div>

//         {showExplain && (
//           <div>
//             <br />
//             <Grid item xs={12}>
//               <Typography variant="subtitle1" component="div">
//                 <strong>Explanation</strong>: {data.answer}
//               </Typography>
//             </Grid>
//             {answer.codeResponse && (
//               <CodeEditor value={answer.codeResponse} mode={mode} />
//             )}
//             {answer.count > 1 && <Findsr />}
//             <Grid item xs={12}>
//               <Typography variant="body1" component="div">
//                 {" "}
//                 I'm <strong>{answer.confidence}</strong> Confident of my answer
//                 , I suggest you to look at <strong> {answer.filename}</strong>.
//                 <br /> Filepath - <strong>{answer.filepath}</strong>.
//               </Typography>
//             </Grid>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
// export default App;
