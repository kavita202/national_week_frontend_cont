import { Form, Input } from "antd";

function Written() {
  return (
    <Form.Item
      name={i}
      value={i}
      rules={[{ required: true, message: "Please input an answer" }]}
    >
      <Input placeholder="Enter answer here" />
    </Form.Item>
  );
}

export default Written;
