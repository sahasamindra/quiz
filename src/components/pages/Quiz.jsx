import React, { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router";
import useQuestions from "../../Hooks/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";
import _ from "lodash";
import { useAuth } from "../../Contexts/Auth";
import { getDatabase, ref, set } from "@firebase/database";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionId].options[action.optionIndex].checked =
        action.value;
      return questions;

    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { loading, error, questions } = useQuestions(id);

  const [qna, dispatch] = useReducer(reducer, initialState);

  const { currentUser } = useAuth();

  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  const handleAnswerChange = (e, index) => {
    dispatch({
      type: "answer",
      questionId: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQ) => prevQ + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevQ) => prevQ - 1);
    }
  };

  const progressPercentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  const handleSubmit = async () => {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [id]: qna,
    });

    history.push({
      pathname: `/result/${id}`,
      state: {
        qna,
      },
    });
  };

  return (
    <>
      {loading && <div>Loading ...</div>}
      {error && <div>Error Occurred</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            progress={progressPercentage}
            submit={handleSubmit}
          />
          <MiniPlayer />
        </>
      )}
    </>
  );
}
