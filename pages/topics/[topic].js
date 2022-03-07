import React, { useCallback, useEffect, useState } from "react";
import MCQ from "../../components/mcq";
import TopicHeader from "../../components/topicHeader.js";
import { Button, Typography, Form, Modal, Space, Result } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0";
import { API_URL } from "../../config/index.js";
import repeat from "../../components/repeat.js";
import { nanoid } from "nanoid";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addResult, setAddResult] = useState("");
  const [visiblebutton, setVisibleButton] = useState(false);
  const { user } = useUser();

  function compare(values) {
    let count = 0;
    for (const [key, value] of Object.entries(values)) {
      if (value === data[key].correct_answer) {
        count++;
      }
    }
    console.log("open modal");
    setResult(count);
    setIsModalVisible(true);
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
  }, [data]);

  const showCorrect = () => {
    setAnswer(true);
    setIsModalVisible(false);
  };

  const reattempt = () => {
    setAnswer(false);
    setIsModalVisible(false);
  };

  const sendResult = useCallback(async () => {
    if (!user) {
      setAddResult("Please sign in to track your progress");
    } else if (user) {
      const userId = user.sub;
      try {
        const response = await fetch(`${API_URL}/progress`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            topic: topic,
            score: result,
          }),
        });
        setAddResult("Result saved");
        setVisibleButton(true);
        repeat(response, topic, result, userId);
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
          <Form onFinish={compare}>
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
              padding: 2em 3em;
              background-color: white;
            }
          `}</style>
          <Modal
            title="Result"
            onOk={showCorrect}
            onCancel={reattempt}
            visible={isModalVisible}
            cancelText="Reattempt"
            okText="Show correct answers"
          >
            <Result
              key={nanoid()}
              icon={result > 4 ? <SmileOutlined /> : <FrownOutlined />}
              title={`You scored: ${result}`}
              subTitle={result > 5 ? "Well done!" : ""}
              extra={[
                <Button
                  key={nanoid()}
                  type="primary"
                  onClick={sendResult}
                  disabled={visiblebutton}
                  id="record"
                >
                  Record result
                </Button>,
                <Space
                  key={nanoid()}
                  direction="horizontal"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    paddingTop: "5px",
                  }}
                >
                  <Text key={nanoid()}>{addResult}</Text>
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

  const res = await fetch(`${API_URL}/questions?topic=${topic}`);
  let data = await res.json();
  data = data.payload;
  return { props: { data, topic } };
}

export default QuestionPage;
