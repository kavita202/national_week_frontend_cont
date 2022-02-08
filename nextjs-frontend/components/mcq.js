import { nanoid } from "nanoid";
import { Form, Radio, Space } from "antd";
function MCQ({ i, shuffledAns, colorChange }) {
  console.log(shuffledAns);
  return (
    <Form.Item
      name={i}
      value={i}
      rules={[{ required: true, message: "Please select an answer!" }]}
    >
      <Radio.Group>
        <Space direction="vertical">
          {shuffledAns.map((obj) => (
            <Radio
              value={obj.answer}
              key={obj.answer}
              style={{ color: obj.correct ? colorChange : "" }}
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
