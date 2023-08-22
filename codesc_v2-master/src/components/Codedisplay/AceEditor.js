import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import copytc from "../../assets/CoC.jpg";
import "./AceEditor.css"; // Make sure to adjust the path if needed
import mixpanel from "mixpanel-browser";
import { MixpanelTracking } from "../../service/mixpanel.js";

function CodeEditor({ value, mode, confidence, file_path }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  //mixpanel
  // mixpanel.track("confidence", {
  //   value: { confidence },
  // });
  return (
    <>
      <div className="code-editor-container">
        <img className="copy-icon" src={copytc} onClick={copyToClipboard} />
        &nbsp;&nbsp;&nbsp;
        {copied ? <t style={{ fontSize: "12px" }}>Copied!</t> : ""}
        <a href={file_path} target="_blank" rel="noopener noreferrer">
          {file_path}
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Confidence
        &nbsp;&nbsp;&nbsp;
        <strong>{confidence}</strong>%
        <div className="code-editor-container-inner">
          {" "}
          <MonacoEditor
            width="100%"
            height="400px"
            language={mode}
            theme="vs-light"
            value={value}
            options={{
              readOnly: true,
              lineNumbers: "off",
              wordWrap: "on",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
