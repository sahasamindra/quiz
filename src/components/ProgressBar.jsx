import React, { useRef, useState } from "react";
// import { Link } from "react-router-dom";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

export default function ProgressBar({ next, prev, progress, submit }) {
  const toolTipRef = useRef();
  const [toolTip, setToolTip] = useState(false);

  const toggleToolTip = () => {
    if (toolTip) {
      setToolTip(false);
      toolTipRef.current.style.display = "none";
    } else {
      setToolTip(true);
      toolTipRef.current.style.left = `calc(${progress}% - 65px)`;
      toolTipRef.current.style.display = "block";
    }
  };

  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>

      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={toolTipRef}>
          {progress}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${progress}%` }}
            onMouseOver={toggleToolTip}
            onMouseOut={toggleToolTip}
          ></div>
        </div>
      </div>

      {/* <Link to="/result"> */}
      <Button
        className={classes.next}
        onClick={progress === 100 ? submit : next}
      >
        <span>{progress === 100 ? `Submit Answer` : `Next Question`}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
      {/* </Link> */}
    </div>
  );
}
