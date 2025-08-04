import React from "react";
import grootBody from "../images/grootbody.png";
import grootHand from "../images/groothand.png";

function Groot() {
  return (
    <div
      className="position-relative groot-component"
      style={{
        height: "150px",
        width: "150px",
      }}
    >
      {/* Groot Body */}
      <img
        className="img-fluid position-absolute groot-body"
        src={grootBody}
        alt="Groot Body"
        style={{
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
      />
      {/* Groot Hand */}
      <img
        className="img-fluid position-absolute groot-hand"
        src={grootHand}
        alt="Groot Hand"
        style={{
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          animation: "waveHand 2s infinite ease-in-out",
        }}
      />
    </div>
  );
}

export default Groot;
