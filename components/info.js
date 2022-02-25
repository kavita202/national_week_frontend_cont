import { Typography, Button } from "antd";
const { Title, Text } = Typography;
import Infobox from "./infobox.js";
import { Tooltip } from "antd";

function Info() {
  return (
    <div className="home">
      <Title>School of Quizzes</Title>
      <Title level={3} italic style={{ color: "#1890FF" }}>
        "My biggest difficulty was retaining information throughout such an
        intense bootcamp"
      </Title>
      <Text type="secondary">-Bootcamper, 2022</Text>
      <Infobox
        title="Overcome the forgetting curve"
        description="Spaced repitition forces learning to be effortful, thus strengthening the connection between nerve cells in the brain. This helps you to retain information for longer and reduces cognitive overload"
        link="/curve2.png"
        direct="https://www.studentdoctor.net/2018/07/31/spaced-repetition/"
      />
      <Infobox
        title="Explore our Topics"
        description="Question sets are randomised and based on a topic of your choice"
        link="/topics.png"
        direct="./topics"
      />
      <Infobox
        title="Track your progress"
        description="Monitor your results using the individualised progress tracker"
        link="/topics.png"
        direct="./progress"
      />

      <style jsx>{`
        .home {
          padding: 30px;
          margin: 0 auto;
          display: grid;
          justify-content: center;
          text-align: center;
          gap: 10px;
          max-width: 600px;
        }
      `}</style>
      <Button>Get started</Button>
    </div>
  );
}
export default Info;
