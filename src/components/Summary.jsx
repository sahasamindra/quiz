import React from "react";
import image from "../assets/images/success.png";
// import useFetch from "../Hooks/useFetch";
import classes from "../styles/Summary.module.css";

export default function Summary({ score, noq }) {
  // const {loading, error, result} = useFetch(`https://picsum.photos/id/237/200/300`, "GET");
  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      <div className={classes.badge}>
        <img src={image} alt="Success" />
      </div>
    </div>
  );
}
