import React from "react";
import classes from "../styles/Question.module.css";
import Answers from "./Answers";

export default function Question({ answers = [] }) {
  return answers.map((ans, index) => (
    <>
      <div className={classes.question} key={index}>
        <div className={classes.qtitle}>
          <span className="material-icons-outlined"> help_outline </span>
          {ans.title}
        </div>
        <Answers options={ans.options} input={false} />
      </div>
    </>
  ));
}
