import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import MCQ from "../../components/mcq";
import { Radio, Form } from "antd";
function shuffleArray(array) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}

function QuestionPage({ data, topic }) {
  const [result, setResult] = useState(-1);
  const [userChoices, setUserChoices] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [shuffledAns, setShuffledAns] = useState([]);
  const [colorChange, setColorChange] = useState("");

  function handleClick(e) {
    e.preventDefault();
    let count = 0;
    for (let i = 0; i < userChoices.length; i++) {
      if (userChoices[i] === data[i].correct_answer) {
        setColorChange("green");
        count++;
      }
    }
    setResult(count);
  }

  useEffect(() => {
    if (data) {
      let answerArray = data.map(({ correct_answer, incorrect_answers }) => [
        { answer: correct_answer, correct: true },
        ...incorrect_answers.map(function (ans) {
          return { answer: ans, correct: false };
        }),
      ]);
      setShuffledAns(answerArray.map((set) => shuffleArray(set)));
    }
    console.log(data);
  }, [data]);

  function handleUserChoice(e, i) {
    setUserChoices([
      ...userChoices.slice(0, i),
      e,
      ...userChoices.slice(i + 1),
    ]);
  }

  if (shuffledAns.length > 1 && data) {
    return (
      <div className="question_Section">
        <h2>{topic[0].toUpperCase() + topic.slice(1)} </h2>
        <form onSubmit={handleClick}>
          {data.map(({ question, id, type }, i) => (
            <div className="QuestionBox" key={id}>
              <h4>{question}</h4>
              <Form.Item name={i} rules={[{ required: true }]}>
                <Radio.Group>
                  {type === "MCQ" ? (
                    shuffledAns[i].map((obj) => (
                      <MCQ
                        colorChange={colorChange}
                        obj={obj}
                        name={i}
                        checked={userChoices[i] === obj.answer}
                        onChange={() => handleUserChoice(obj.answer, i)}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </Radio.Group>
              </Form.Item>
            </div>
          ))}
          <div className="feedback">
            <button type="submit">Submit</button>
            {result > -1 ? (
              <h3 style={{ color: result > 4 ? "green" : "red" }}>
                You scored {result} out of 6.
              </h3>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    );
  } else {
    return <></>;
  }
}

export async function getServerSideProps(context) {
  const { topic } = context.query;
  const res = await fetch(`http://localhost:5000/questions?topic=${topic}`);
  let data = await res.json();
  data = data.payload;
  return { props: { data, topic } };
}

export default QuestionPage;
