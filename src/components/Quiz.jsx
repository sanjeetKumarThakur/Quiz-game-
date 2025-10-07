import React, { useState, useRef } from "react";
import "./Quiz.css";
import { data } from "../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [error, setError] = useState(""); // For error message

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const option_array = [option1, option2, option3, option4];

  const question = data[index]; // ✅ Always read directly from index

  const checkAns = (e, ans) => {
    if (!lock) {
      setError(""); // Clear error on selection
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (!lock) {
      setError("Please choose an option before clicking Next.");
      return;
    }
    if (index + 1 < data.length) {
      // ✅ Correctly go to next question
      setIndex((prev) => prev + 1);
      setLock(false);
      setError("");

      // reset options styling
      option_array.forEach((opt) => {
        if (opt.current) {
          opt.current.classList.remove("correct", "wrong");
        }
      });
    } else {
      // ✅ End of quiz
      setResult(true); // Show result screen
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    setError("");
    option_array.forEach((opt) => {
      if (opt.current) {
        opt.current.classList.remove("correct", "wrong");
      }
    });
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {!result ? (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>

          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>

          <button onClick={next}>Next</button>
          {error && (
            <div
              style={{
                color: "#ff4A4a",
                textAlign: "center",
                marginTop: "8px",
                fontSize: "15px",
              }}
            >
              {error}
            </div>
          )}
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      ) : (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          <button onClick={resetQuiz}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Quiz;
