import React from "react";
import "./MobileToggle.css";

const MobileToggle = (props) => (
  <button className="mobile_toggle" onClick={props.onOpen}>
    <span className="mobile_toggle_bar" />
    <span className="mobile_toggle_bar" />
    <span className="mobile_toggle_bar" />
  </button>
);

export default MobileToggle;
