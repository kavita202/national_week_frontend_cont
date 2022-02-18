import { Modal, Button, Space, Result, Text } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

function Popup({
  showCorrect,
  reattempt,
  result,
  isModalVisible,
  sendResult,
  addResult,
}) {
  return (
    <>
      {isModalVisible ? (
        <Modal
          title="Result"
          onCancel={() => showCorrect}
          onOk={() => reattempt}
          visible={() => isModalVisible}
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
      ) : (
        <></>
      )}
    </>
  );
}

export default Popup;
