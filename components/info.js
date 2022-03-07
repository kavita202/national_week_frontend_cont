import { Typography, Button } from "antd";
const { Title, Text } = Typography;
import Infobox from "./infobox.js";
import { useRouter } from "next/router";
import { GiElephant } from "react-icons/gi";
function Info() {
  const router = useRouter();
  return (
    <>
      <div className="home">
        <Title style={{ fontSize: "4em" }}>
          Haathee
          <br /> <GiElephant size={"6em"} />
        </Title>
        <Title level={3} italic style={{ color: "#1890FF", paddingTop: "0px" }}>
          "The best way science knows to prevent forgetting is to practice
          regularly... Unless you revisit knowledge, or are forced to think
          about it, you will lose memories."
        </Title>
        <Text type="secondary">-The Programmer's Brain, Felienne Hermans</Text>
        <Infobox
          title="Overcome the forgetting curve"
          description="Spaced repetition forces learning to be effortful, thus strengthening the connection between nerve cells in the brain. This helps you to retain information for longer and reduces cognitive overload"
          link="/curve2.png"
          direct="https://www.studentdoctor.net/2018/07/31/spaced-repetition/"
        />
        <Infobox
          title="Explore our Topics"
          description="Question sets are randomised and based on a topic of your choice. Once complete, you will continue to receive due dates based on your performance"
          link="/topics.png"
          direct="/topics"
        />
        <Infobox
          title="Track your progress"
          description="Monitor your results using the individualized progress tracker"
          link="/progress2.png"
          direct="/progress"
        />
        <div className="buttonBox">
          <></>
          <Button
            type="primary"
            id="button"
            size="large"
            onClick={() => {
              router.push({
                pathname: "/topics",
              });
            }}
          >
            Get started
          </Button>
        </div>
      </div>
      <style jsx>{`
        .home {
          padding: 50px;
          margin: 0 auto;
          display: grid;
          justify-content: center;
          text-align: center;
          gap: 10px;
          max-width: 800px;
        }
        .home > .ant-btn {
          padding: 3em;
          color: red;
          max-width: 200px;
        }
      `}</style>
    </>
  );
}
export default Info;
