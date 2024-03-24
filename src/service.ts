import { questions } from "./questions/questionList.js";
var _ = require("lodash");

function setLiveQuestions(id: number): void {
  const liveQuestions: any[] = getLiveQuestions();
  liveQuestions.push(id);
  localStorage.setItem("liveQuestions", JSON.stringify(liveQuestions));
}

function removeLiveQuestions(id: number): void {
  let liveQuestions: any[] = getLiveQuestions();
  liveQuestions = liveQuestions.filter(function (item) {
    return item !== id;
  });
  localStorage.setItem("liveQuestions", JSON.stringify(liveQuestions));
}

function setQuestionsStorage(question: any): void {
  const questionsStorage: any[] = getQuestionsStorage();
  let find = questionsStorage.find((val) => val.id == question.id);
  if (find) return;
  questionsStorage.push(question);
  localStorage.setItem("questionsStorage", JSON.stringify(questionsStorage));
}

function getLiveQuestions(): any[] {
  var liveQuestions: any = localStorage.getItem("liveQuestions");

  try {
    liveQuestions = JSON.parse(liveQuestions);
  } catch (error) {
    liveQuestions = [];
  }

  return liveQuestions;
}

function getQuestionsStorage(): any[] {
  var questionsStorage: any = localStorage.getItem("questionsStorage");

  try {
    questionsStorage = JSON.parse(questionsStorage);
  } catch (error) {
    questionsStorage = [];
  }

  return questionsStorage;
}

export function getNewQuestion() {
  // debugger
  const liveQuestions = getLiveQuestions();
  const filterQuestion = questions.filter(
    (val) => !liveQuestions.includes(val.id)
  );

  const question = _.sample(filterQuestion);

  if (question) {
    setLiveQuestions(question.id);
    setQuestionsStorage(question);
    console.log(filterQuestion);
    return question;
  } else {
    const question = questions[0];
    setLiveQuestions(question.id);
    setQuestionsStorage(question);
    return question;
  }
}

export function updateVote(questionId: number, optionId: number) {
  let questionsStorage: any = localStorage.getItem("questionsStorage");
  try {
    questionsStorage = JSON.parse(questionsStorage);
  } catch (error) {
    questionsStorage = [];
  }

  const findQuestionIndex = questionsStorage.findIndex(
    (val: any) => val.id == questionId
  );

  const questionObj = questionsStorage[findQuestionIndex];
  console.log(questionObj);

  const findOptionIndex = questionObj.options.findIndex(
    (val: any) => val.optionId == optionId
  );
  questionObj.options[findOptionIndex].count =
    questionObj.options[findOptionIndex].count + 1;
  localStorage.setItem("questionsStorage", JSON.stringify(questionsStorage));
  return questionObj.options;
}

window.onunload = function () {
  const selectEle = document.querySelectorAll(".affinity_poll .poll");
  selectEle.forEach((ele) => {
    const id = Number(ele.getAttribute("data-qid"));
    removeLiveQuestions(id);
  });
};
