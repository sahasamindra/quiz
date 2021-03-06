import React from "react";
import Analysis from "../Analysis";
import Summary from "../Summary";
import { useHistory, useParams } from "react-router-dom";
import useAnswers from "../../Hooks/useAnswers";
import _ from "lodash";

export default function Result() {
  const { id } = useParams();
  const { location } = useHistory();
  const { state } = location;
  const { qna } = state;

  const { loading, error, answers } = useAnswers(id);

  const calculate = () => {
    let score = 0;
    answers.forEach((question, index1) => {
      let correctIndexes = [];
      let checkedIndexes = [];
      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);
        if (qna[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score = score + 5;
      }
    });

    return score;
  };

  const userScore = calculate();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error Occurred</div>}
      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
