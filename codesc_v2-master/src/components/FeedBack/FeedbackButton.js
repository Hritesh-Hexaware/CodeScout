import React, { useState } from "react";
import axios from "axios";
import FeedbackModal from "./Feedback.js";
import thumbsup from "../../assets/thumbs.png";
import thumbsd from "../../assets/thumbsu.png";
import { Button } from "@mui/material";
import { MixpanelTracking } from "../../service/mixpanel.js";
const FeedbackButton = () => {
  const [showThumbsUp, setShowThumbsUp] = useState(true);
  const [showThumbsDown, setShowThumbsDown] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleThumbsUpClick = () => {
    MixpanelTracking.getInstance().thumbsup();

    // Record feedback for thumbs up
    // You can implement API call or other actions here
  };

  const handleThumbsDownClick = () => {
    MixpanelTracking.getInstance().thumbsDown();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ display: "flex", marginLeft: "-40px" }}>
      {showThumbsUp && (
        <Button
          onClick={handleThumbsUpClick}
          size="small" // Set the size to "small"
        >
          <span role="img" aria-label="thumbs-up">
            <img src={thumbsup} alt="" width={15} height={15} />{" "}
          </span>
        </Button>
      )}
      {showThumbsDown && (
        <Button onClick={handleThumbsDownClick}>
          <span role="img" aria-label="thumbs-down">
            <img src={thumbsd} alt="" width={15} height={15} />{" "}
          </span>
        </Button>
      )}

      {/* Modal window */}
      {showModal && (
        <FeedbackModal showModal={showModal} closeModal={closeModal} />
      )}
    </div>
  );
};

export default FeedbackButton;
