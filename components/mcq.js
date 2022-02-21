import { nanoid } from "nanoid";
import { Form, Radio, Space } from "antd";
function MCQ({ i, shuffledAns, answer }) {
  console.log(answer);
  return (
    <Form.Item
      name={i}
      value={i}
      rules={[{ required: true, message: "Please select an answer" }]}
    >
      <Radio.Group>
        <Space direction="vertical">
          {shuffledAns.map((obj) => (
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
          ))}
        </Space>
      </Radio.Group>
    </Form.Item>
  );
}

export default MCQ;
