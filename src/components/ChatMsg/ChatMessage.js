import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { Person as UserIcon, Android as BotIcon } from "@mui/icons-material";

function ChatMessage({ type, message }) {
  return (
    <div
      className={`message ${type === "user" ? "user-message" : "bot-message"}`}
    >
      <Box display="flex" alignItems="center">
        {type === "user" ? (
          <Avatar>
            <UserIcon />
          </Avatar>
        ) : (
          <Avatar>
            <BotIcon />
          </Avatar>
        )}
        <Typography variant="body1" component="div" sx={{ ml: 1 }}>
          {message}
        </Typography>
      </Box>
    </div>
  );
}

export default ChatMessage;
