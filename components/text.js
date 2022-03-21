import { Form, Input } from "antd";

function TextAns({ i, answer, set }) {
  return (
    <Form.Item
      name={`!${i}`}
      value={i}
      rules={[{ required: true, message: "Please input an answer" }]}
    >
      <Input placeholder="Enter answer here" />
      {answer ? (
        <p
          style={{
            fontWeight: "600",
            color: "green",
          }}
        >
          {set.correct_answer}
        </p>
      ) : (
        <></>
      )}
    </Form.Item>
  );
}

export default TextAns;
