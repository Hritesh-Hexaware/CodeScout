import React, { useState } from "react";
import { Tooltip, Typography, Grid, Button } from "@mui/material";
import CodeEditor from "../Codedisplay/AceEditor.js";
import "../../app/App.css";
import { MixpanelTracking } from "../../service/mixpanel.js";
function Message({ message }) {
  const [isMessageExpanded, setMessageExpanded] = useState(false);

  const toggleMessage = () => {
    setMessageExpanded(!isMessageExpanded);
  };

  return (
    <div>
      {isMessageExpanded ? (
        <Typography variant="body1">{message}</Typography>
      ) : (
        <Typography variant="body1">
          {message.slice(0, 100)}
          {message.length > 100 && (
            <>
              {"... "}
              <Button onClick={toggleMessage} variant="text">
                Read More
              </Button>
            </>
          )}
        </Typography>
      )}
    </div>
  );
}
const ExplanationContainer = ({ lastUserMessage, data, mode }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMessageExpanded, setMessageExpanded] = useState(false);

  const toggleDropdown = () => {
    MixpanelTracking.getInstance().secondDraft(data.data[1]);
    setShowDropdown(!showDropdown);
  };
  const toggleMessage = () => {
    setMessageExpanded(!isMessageExpanded);
  };
  return (
    <div className="explanation-container">
      <div>
        <div>
          <div>
            <Message message={lastUserMessage} />
          </div>
          <br />
          <Grid item xs={12}>
            <Typography variant="subtitle1" component="div">
              <strong>{data.data[0].summary}</strong> <br />
            </Typography>{" "}
          </Grid>
          <br />
          {data.data[0].snippet && (
            <CodeEditor
              value={data.data[0].snippet}
              mode={mode}
              confidence={data.data[0].confidence}
              file_path={data.data[0].file_path.split("/").slice(-2).join("/")}
            />
          )}
          <br /> <strong>Business Sensitivity</strong>{" "}
          {data.data[0].business_sensitivity}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <strong>Patch/Bug Frequency</strong>&nbsp;&nbsp;
          {data.data[0].patched_frequency}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <strong>Time Complexity</strong>&nbsp;&nbsp;
          {data.data[0].time_complexity.length > 5
            ? "NA"
            : data.data[0].time_complexity}
          <br /> <br />
          <strong>Details</strong>
          <div>
            <Grid item xs={12}>
              {data.data[0].details.split("\n").map((part, index) => (
                <Typography key={index} variant="body1" component="div">
                  {part}
                </Typography>
              ))}
            </Grid>
            <br />
          </div>
        </div>
        {/* Conditional Dropdown */}
        {data.count > 1 && (
          <div
            className={`dropdown-container ${showDropdown ? "visible" : ""}`}
          >
            <Button
              onClick={toggleDropdown}
              sx={{
                padding: "3px 5px",
                width: "100%",
                justifyContent: "right-center",
              }}
              variant="outlined"
            >
              {" "}
              <p style={{ fontSize: "10px", color: "black", margin: "0" }}>
                You May Also Refer to the Below Approach
              </p>{" "}
              <span style={{ flex: 1, textAlign: "center" }}>⬇️</span>
              <strong style={{ fontSize: "12px", color: "black", margin: "0" }}>
                {data.data[1].confidence}
              </strong>
              <p style={{ fontSize: "10px", color: "black", margin: "0" }}>
                % &nbsp;Confident{" "}
              </p>{" "}
            </Button>
            {showDropdown && (
              <div className="dropdown-content">
                <Typography variant="subtitle1" component="div">
                  <strong>{data.data[1].summary}</strong> <br />
                  <br />
                </Typography>
                {data.data[1].snippet && (
                  <CodeEditor
                    value={data.data[1].snippet}
                    mode={mode}
                    confidence={data.data[1].confidence}
                    file_path={data.data[1].file_path
                      .split("/")
                      .slice(-2)
                      .join("/")}
                  />
                )}
                <br />
                {data.data[1].details.split("\n").map((part, index) => (
                  <Typography key={index} variant="body1" component="div">
                    {part}
                  </Typography>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplanationContainer;
