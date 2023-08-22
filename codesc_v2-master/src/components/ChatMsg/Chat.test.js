import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"; // Use the updated adapter
import ChatMessage from "./ChatMessage";

// Configure Enzyme to use the updated adapter
configure({ adapter: new Adapter() });

describe("ChatMessage Component", () => {
  it("should render a user message", () => {
    const type = "user";
    const message = "Hello, this is a user message.";
    // Render the component
    const wrapper = shallow(<ChatMessage type={type} message={message} />);

    // You can now make assertions using Jest
    // For example, assert that the component output contains the message text
    expect(wrapper.text()).toContain(message);
  });

  it("should render a bot message", () => {
    const type = "bot";
    const message = "Hello, this is a bot message.";
    // Render the component
    const wrapper = shallow(<ChatMessage type={type} message={message} />);

    // You can now make assertions using Jest
    // For example, assert that the component output contains the message text
    expect(wrapper.text()).toContain(message);
  });

  // Add more test cases as needed
});
