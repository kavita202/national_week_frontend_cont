import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import MCQ from "../../components/mcq";
import Text from "../../components/text";
// import Result from "../../components/result";
import { Button, Radio, Form, Modal, Result } from "antd";
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  function onFinish(values) {
    setUserChoices(values);
    compare();
  }

  function compare() {
    let count = 0;
    for (const [key, value] of Object.entries(userChoices)) {
      if (value === data[key].correct_answer) {
        count++;
      }
      setResult(count);
      showModal();
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

  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 8 },
  //   },
  //   wrapperCol: {
  //     xs: { span: 16 },
  //     // sm: { span: 16 },
  //   },
  // };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showCorrect = () => {
    setColorChange("green");
    setIsModalVisible(false);
    console.log(isModalVisible);
  };

  const reattempt = () => {
    setColorChange("");
    setIsModalVisible(false);
  };

  if (shuffledAns.length > 1 && data) {
    return (
      <div className="question_Section">
        <h2>{topic[0].toUpperCase() + topic.slice(1)} </h2>
        <Form onFinish={onFinish}>
          {data.map(({ question, id, type }, i) => (
            <div className="QuestionBox" key={id}>
              <h4>{question}</h4>
              {type === "MCQ" ? (
                <MCQ
                  i={i}
                  shuffledAns={shuffledAns[i]}
                  colorChange={colorChange}
                />
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
        <Modal
          title="Result"
          onCancel={showCorrect}
          onOk={reattempt}
          visible={isModalVisible}
          cancelText="Show correct answers"
          okText="Reattempt"
        >
          <Result
            status={result > 6 ? "success" : "warning"}
            title={`You scored: ${result}`}
            // subTitle=""
            extra={[
              <Button type="primary" key="log">
                Record result
              </Button>,
            ]}
          />
        </Modal>
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
