import React, { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import MCQ from "../../components/mcq";
import TopicHeader from "../../components/topicHeader.js";
import Written from "../../components/text";
// import Result from "../../components/result";
import { Button, Typography, Space, Form, Modal, Result } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
// import ReactCanvasConfetti from
import "antd/dist/antd.css";
import { useUser } from "@auth0/nextjs-auth0";

function shuffleArray(array) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}
const { Text } = Typography;
function QuestionPage({ data, topic }) {
  const [result, setResult] = useState(-1);
  const [shuffledAns, setShuffledAns] = useState([]);
  const [answer, setAnswer] = useState(false);
  const [userChoices, setUserChoices] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addResult, setAddResult] = useState("");
  const { user } = useUser();
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showCorrect = () => {
    setAnswer(true);
    setIsModalVisible(false);
    console.log(isModalVisible);
  };

  const reattempt = () => {
    setAnswer(false);
    setIsModalVisible(false);
  };

  const sendResult = useCallback(() => {
    if (!user) {
      setAddResult("Please sign in to track your progress");
    } else if (user) {
      const userId = user.sub;
      try {
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            topic: topic,
            score: result,
          }),
        });
        console.log(result);
        setAddResult("Result saved");
      } catch (error) {
        setAddResult("Please try again");
      }
    }
  }, [user, result]);

  if (shuffledAns.length > 1 && data) {
    return (
      <>
        <TopicHeader topic={topic[0].toUpperCase() + topic.slice(1)} />
        <div className="question_Section">
          <Form onFinish={onFinish}>
            {data.map(({ question, id, type }, i) => (
              <div className="QuestionBox" key={id}>
                <h4>{question}</h4>
                {type === "MCQ" ? (
                  <MCQ i={i} shuffledAns={shuffledAns[i]} answer={answer} />
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
          <style jsx>{`
            .question_Section {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              max-width: 600px;
              margin: 0 auto;
              justify-content: center;
              padding: 0 20px;
              background-color: white;
            }
          `}</style>
          <Modal
            title="Result"
            onCancel={showCorrect}
            onOk={reattempt}
            visible={isModalVisible}
            cancelText="Show correct answers"
            okText="Reattempt"
          >
            <Result
              icon={result > 4 ? <SmileOutlined /> : <FrownOutlined />}
              title={`You scored: ${result}`}
              subTitle={result > 5 ? "Well done!" : ""}
              extra={[
                <Button type="primary" key="log" onClick={sendResult}>
                  Record result
                </Button>,
                <Space
                  direction="horizontal"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    paddingTop: "5px",
                  }}
                >
                  <Text>{addResult}</Text>
                </Space>,
              ]}
            />
          </Modal>
        </div>
      </>
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
