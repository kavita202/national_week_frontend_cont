import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import MCQ from "../../components/mcq";
import Text from "../../components/text";
import { Button, Radio, Form } from "antd";
import "antd/dist/antd.css";

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
  const [shuffledAns, setShuffledAns] = useState([]);
  const [colorChange, setColorChange] = useState("");
  const [userChoices, setUserChoices] = useState("");

  function onFinish(values) {
    setUserChoices(values);
    compare();
  }

  function compare() {
    let count = 0;
    for (const [key, value] of Object.entries(userChoices)) {
      if (value === data[key].correct_answer) {
        setColorChange("green");
        count++;
      }
      setResult(count);
      console.log(count);
    }
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

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 16 },
      // sm: { span: 16 },
    },
  };

  if (shuffledAns.length > 1 && data) {
    return (
      <div className="question_Section">
        <h2>{topic[0].toUpperCase() + topic.slice(1)} </h2>
        {result > -1 ? (
          <h3 style={{ color: result > 4 ? "green" : "red" }}>
            You scored {result} out of 6.
          </h3>
        ) : (
          <></>
        )}
        <Form onFinish={onFinish} {...formItemLayout}>
          {data.map(({ question, id, type }, i) => (
            <div className="QuestionBox" key={id}>
              <h4>{question}</h4>
              {type === "MCQ" ? (
                <MCQ i={i} shuffledAns={shuffledAns[i]} />
              ) : (
                <></>
              )}
            </div>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
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
