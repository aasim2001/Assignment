import "./style.scss";
import * as React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";

const questions = [
  {
    id: 1,
    value: "How you feel today:",
    options: [
      {
        optionId: 1,
        value: "Brilliant! I have so much energy",
        count: 0,
      },
      {
        optionId: 2,
        value: "Always can be worse.",
        count: 0,
      },
      {
        optionId: 3,
        value: "Please, end my misery.",
        count: 0,
      },
    ],
  },
];

function Counter() {
  console.log(questions[0].value);
  const question = questions[0];

  const answeredQuestion = (answer: number) => {
    console.log(answer);
    
  }

  const [count, setCount] = useState(0);
  return (
    <div className="affinity_poll">
      <div className="card">
        <h3>{question.value}</h3>

        {question.options.map((ops) => {
          return (
            <div className="option" key={ops.optionId} onClick={() => answeredQuestion(ops.optionId)}>
              <div className="radioBtn"></div>
              <div className="value">{ops.value}</div>
              
            </div>
          );
