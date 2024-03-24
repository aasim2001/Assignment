import "./style.scss";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { getNewQuestion, updateVote } from "./service";

if (!localStorage.getItem("liveQuestions")) {
  localStorage.setItem("liveQuestions", JSON.stringify([]));
}

if (!localStorage.getItem("questionsStorage")) {
  localStorage.setItem("questionsStorage", JSON.stringify([]));
}

function PollGraph({ vote, options }: any) {
  console.log(options);

  const totalVotes = options.reduce((r: number, a: any) => {
    r = r + a.count;
    return r;
  }, 0);

  const progressRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const progresEle: HTMLElement = progressRef.current;
      if (progresEle) {
        progresEle.style.width = `${(vote / totalVotes) * 100}%`;
      }
    }, 0);
  }, [vote]);

  return (
    <>
      <div className="progress2 progress-moved">
        <div className="progress-bar2" ref={progressRef}></div>
      </div>
      <div className="voteStatus">
        <div>
          Votes: {vote} / {totalVotes}
        </div>
        <div>{Math.floor((vote / totalVotes) * 100)}%</div>
      </div>
    </>
  );
}

function Check() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="15"
      viewBox="0 -960 960 960"
      width="15"
      fill="#fff"
    >
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  );
}

function Poll({ question }: any) {
  const [answer, setAnswer] = useState(null);
  const [options, setOptions] = useState(question.options);

  const answeredQuestion = (questionId: number, optionId: number) => {
    if (!answer) {
      const updatedOptions = updateVote(questionId, optionId);
      setOptions(updatedOptions);
      setAnswer(optionId);
    }
  };

  return (
    <div className="poll" data-qid={question.id}>
      <div className={`card ${answer != null ? "answered" : ""}`}>
        <h3>{question.value}</h3>

        {options.map((ops: any) => {
          return (
            <div
              className={`option ${answer == ops.optionId ? "selected" : ""}`}
              key={ops.optionId}
              onClick={() => answeredQuestion(question.id, ops.optionId)}
            >
              <div
                className={`btn ${answer == ops.optionId ? "selected" : ""}`}
              >
                <div className="radioBtn">
                  {answer == ops.optionId ? <Check /> : null}
                </div>
                <div className="value">{ops.value}</div>
              </div>
              {answer != null ? (
                <PollGraph
                  className="answerContainer"
                  options={options}
                  vote={ops.count}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const selectEle = document.querySelectorAll(".affinity_poll");
selectEle.forEach((ele: HTMLElement) => {
  const question = getNewQuestion();
  const root = createRoot(ele);
  root.render(<Poll question={question} />);
});
