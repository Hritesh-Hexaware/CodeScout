import { Public, RepeatOneSharp } from "@mui/icons-material";
import mixpanel from "mixpanel-browser";
import { mixpanelKey } from "../utils/Constants.js";

export class MixpanelTracking {
  static _instance;

  static getInstance() {
    if (MixpanelTracking._instance == null)
      return (MixpanelTracking._instance = new MixpanelTracking());

    return this._instance;
  }

  constructor() {
    mixpanel.init(mixpanelKey, {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
  }

  track(name, data) {
    mixpanel.track(name, data);
  }

  querySubmit(query) {
    this.track("Query submit", {
      query: query,
    });
  }

  botReply(response) {
    this.track("Bot Response", {
      response: response,
      response_length: response.length,
    });
  }

  thumbsUp() {
    this.track("thumbsUp");
  }

  thumbsDown() {
    this.track("thumbsDown");
  }

  feedbackSubmit(rating, ratingb, responseYes, comment) {
    this.track("Feedback Submit", {
      result_not_matched: rating,
      wrong_result: ratingb,
      broken_link: responseYes,
      comment: comment,
    });
  }

  confidenceScore(confidence) {
    this.track("Confidence Score", {
      confidence: confidence,
    });
  }

  firstDraft(data) {
    this.track("Data check", {
      confidence: data.confidence,
      business_sensitivity: data.business_sensitivity,
      patched_frequency: data.patched_frequency,
      time_complexity: data.time_complexity,
    });
  }

  secondDraft(data) {
    this.track("Second draft data", {
      confidence: data.confidence,
      business_sensitivity: data.business_sensitivity,
      patched_frequency: data.patched_frequency,
      time_complexity: data.time_complexity,
    });
  }
}
