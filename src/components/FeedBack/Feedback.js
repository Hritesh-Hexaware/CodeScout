import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./FeedbackModal.css";
import { Button } from "@mui/material";
import mixpanel from "mixpanel-browser";
import { MixpanelTracking } from "../../service/mixpanel.js";
const FeedbackModal = ({ showModal, closeModal }) => {
  const [rating, setRating] = useState(0);
  const [ratingb, setRatingb] = useState(0);
  const [responseYes, setResponseYes] = useState(false);

  const [comment, setComment] = useState("");

  const handleSubmitFeedback = async () => {
    // Send the feedback to the API (you'll need to replace 'API_URL' with your actual API URL)
    const feedbackData = {
      rating: rating,
      comment: comment,
    };
    MixpanelTracking.getInstance().feedbackSubmit(
      rating,
      ratingb,
      responseYes,
      comment
    );

    try {
      const response = await axios.post(`${"API_URL"}/feedback`, feedbackData);
      console.log("Feedback submitted:", response.data);

      // You can show a success message or do other actions after successful submission.
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Handle the error, e.g., show an error message.
    }

    closeModal();
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <br />
        <strong>Please tell us what went wrong for us to Improve:</strong>
        <br /> <br />
        <div className="rating">
          The results did not match what I wanted to find
          <br /> <br />
          {/* Your 5-star rating component here */}
          {/* Replace the following div with your 5-star rating component */}
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{ cursor: "pointer" }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;{star <= rating ? "★" : "☆"}
              </span>
            ))}
          </div>
          <br />
          <div>
            The summary and explanation were wrong
            <br /> <br />
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRatingb(star)}
                style={{ cursor: "pointer" }}
              >
                &nbsp;&nbsp;&nbsp; {star <= ratingb ? "★" : "☆"}
              </span>
            ))}
          </div>
          <br />
        </div>
        <div className="response">
          <p>Does the Code have broken Linkage ? </p>
          <label>
            <input
              type="radio"
              name="response"
              value="yes"
              checked={responseYes === true}
              onChange={() => setResponseYes(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="response"
              value="no"
              checked={responseYes === false}
              onChange={() => setResponseYes(false)}
            />
            No
          </label>
        </div>
        <br />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comments..."
          rows="4"
        ></textarea>
        <div className="buttonsub">
          <Button onClick={handleSubmitFeedback}>Submit</Button>
          <Button onClick={closeModal}>Skip</Button>
        </div>
      </div>
    </div>
  );
};

FeedbackModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default FeedbackModal;
