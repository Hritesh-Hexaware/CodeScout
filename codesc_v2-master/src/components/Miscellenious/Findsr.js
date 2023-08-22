import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  CircularProgress,
} from "@mui/material";
import AceEditor from "react-ace";
import axios from "axios";

const API_URL =
  "https://0d68118e-fc6e-4179-9da2-d43fd5b4394a.mock.pstmn.io/codebits/v1/search?searchQuery=";

const Findsr = ({ modalText }) => {
  const [open, setOpen] = useState(false);
  const [dropdownExpanded, setDropdownExpanded] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [mode, setMode] = useState("java");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState("");
  const [filepath, setFilepath] = useState("");
  const [similarity, setSimilarity] = useState("");

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const fetchCodeExplanationImprovements = async () => {
    try {
      setLoading(true);
      const apiResponse = await axios.get(API_URL);
      setSimilarity(apiResponse.data.data[1].others.confidence);
      setFilename(apiResponse.data.data[1].others.file_name);
      setFilepath(apiResponse.data.data[1].others.source_file);
      if (!apiResponse.ok) {
        setErrorMessage("Getting tasks failed " + apiResponse.status);
        throw new Error("Request failed with status " + apiResponse.status);
      }
    } catch (error) {
      setErrorMessage("Getting code response failed " + error);
      console.log("Error fetching data from API:", error);
    } finally {
      setLoading(false);
    }
  };

  //   const getCodeResponse = () => {
  //     return apiData ? apiData.code : "";
  //   };

  const handleCardClick = async () => {
    setLoading(true); // Start the loading state when the card is clicked
    await fetchCodeExplanationImprovements();
    setLoading(false); // Stop the loading state after the API call is completed
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDropdownClick = () => {
    setDropdownExpanded(!dropdownExpanded);
  };

  return (
    <>
      <div>
        <div onClick={handleCardClick} style={{ cursor: "pointer" }}>
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <span style={{ textDecoration: "underline", color: "blue" }}>
              Find Next Best Answer{" "}
            </span>
          )}
        </div>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "60%",
              left: "70%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 54,
              p: 3,
              width: "500px",
              height: "160px",
            }}
          >
            <Typography variant="body1" gutterBottom>
              <>
                <List dense>
                  <ListItem></ListItem>
                  <ListItem>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ marginTop: "5px" }}
                    >
                      Condidence&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                      {similarity}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body2" color="textSecondary">
                      Filename&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                      {filename}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body2" color="textSecondary">
                      Filepath&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                      {filepath}
                    </Typography>
                  </ListItem>
                </List>
              </>
            </Typography>
            <button onClick={handleClose}>Close</button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Findsr;
