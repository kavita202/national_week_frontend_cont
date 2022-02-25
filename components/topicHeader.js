import { PageHeader, Button } from "antd";
import { useRouter } from "next/router";
import { images } from "./images.js";

function TopicHeader({ topic }) {
  const router = useRouter();

  return (
    <>
      <PageHeader
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
            style={{ background: "#5400FF", border: "#5400FF" }}
          >
            Shuffle Questions
          </Button>
        ]}
      />
    </>
  );
}

export default TopicHeader;
