import { Form, Radio, Space } from "antd";
import { useState, useEffect } from "react";

function shuffleArray(array) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}

function MCQ({ i, set, answer }) {
  const [shuffledAns, setShuffledAns] = useState(false);
  useEffect(() => {
    if (set) {
      const { correct_answer, incorrect_answers } = set;
      let answerArray = [
        { answer: correct_answer, correct: true },
        ...incorrect_answers.map(function (ans) {
          return { answer: ans, correct: false };
        }),
      ];
      setShuffledAns(answerArray.map((set) => shuffleArray(set)));
    }
  }, [set]);

  return (
    <Form.Item
      name={i}
      value={i}
      rules={[{ required: true, message: "Please select an answer" }]}
    >
      <Radio.Group>
        <Space direction="vertical">
          {shuffledAns ? (
            shuffledAns.map((obj) => (
              <Radio
                value={obj.answer}
                key={obj.answer}
                style={{
                  fontWeight: obj.correct && answer ? "600" : "",
                  color: obj.correct && answer ? "green" : "",
                }}
              >
                {obj.answer}
              </Radio>
            ))
          ) : (
            <></>
          )}
        </Space>
      </Radio.Group>
    </Form.Item>
  );
}

export default MCQ;
