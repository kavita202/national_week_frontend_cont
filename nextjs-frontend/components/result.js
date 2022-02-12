import { Modal, Button } from "antd";

function Result(result, showCorrect, reattempt, visible) {
  return (
    <Modal
      title="Performance"
      visible={visible}
      onOk={showCorrect}
      onCancel={reattempt}
      okText="Show correct answers"
      cancelText="Reattempt quiz"
    >
      <p>Score: {result}</p>
    </Modal>
  );
}

export default Result;
