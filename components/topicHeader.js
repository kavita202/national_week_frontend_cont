import { PageHeader, Button, Affix } from "antd";
import { useRouter } from "next/router";
import { images } from "./images.js";

function TopicHeader({ topic }) {
  const router = useRouter();

  return (
    <div
      style={{
        position: "sticky",
        zIndex: 1,
        width: "100%",
        top: "0px",
      }}
    >
      <PageHeader
        style={{
          backgroundColor: "white",
          margin: "0 auto",
          maxWidth: "1200px",
          justifyContent: "space-between",
          borderBottom: "1px solid #f0f0f0",
        }}
        className="topic-page-header"
        avatar={{ src: `${images[topic]}`, shape: "square" }}
        onBack={() =>
          router.push({
            pathname: "/topics",
          })
        }
        title={topic}
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => {
              router.reload(window.location.pathname);
            }}
          >
            Reload Questions
          </Button>,
        ]}
      ></PageHeader>
    </div>
  );
}

export default TopicHeader;
