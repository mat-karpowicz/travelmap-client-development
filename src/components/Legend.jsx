import React from "react";

import globe from "../assets/globe.png";
import github from "../assets/github.png";
import linked from "../assets/linked.png";

function Legend() {
  const toggleMarkers = (e) => {
    const elements = document.getElementsByClassName(`${e.target.id}`);
    Array.from(elements).forEach((elem) => {
      elem.classList.toggle("hide");
    });
  };

  return (
    <div className="legend">
      <div>
        <input
          id="food"
          type="checkbox"
          defaultChecked={true}
          onClick={toggleMarkers}
        />
        <label htmlFor="food">Food places</label>
      </div>
      <div>
        <input
          id="view"
          type="checkbox"
          defaultChecked={true}
          onClick={toggleMarkers}
        />
        <label htmlFor="view">View places</label>
      </div>
      <div>
        <input
          id="history"
          type="checkbox"
          defaultChecked={true}
          onClick={toggleMarkers}
        />
        <label htmlFor="history">History places</label>
      </div>
      <div className="links">
        <a
          href="https://karpowiczm.pl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={globe} alt="globe" />{" "}
        </a>
        <a
          href="https://github.com/mat-karpowicz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} alt="git" />{" "}
        </a>
        <a
          href="https://www.linkedin.com/in/karpowiczm/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linked} alt="linked" />{" "}
        </a>
      </div>
    </div>
  );
}

export default Legend;
