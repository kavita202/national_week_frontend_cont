import { Typography, Button } from "antd";
const { Title, Text } = Typography;
import Infobox from "./infobox.js";
import { useRouter } from "next/router";
function Info() {
  const router = useRouter();
  return (
    <>
      <div className="home">
        <Title level={1} style={{ marginBottom: "0" }}>
          haathee
        </Title>
        <Title level={4} italic style={{ color: "#1890FF" }}>
          "The best way science knows to prevent forgetting is to practice
          regularly... Unless you revisit knowledge, or are forced to think
          about it, you will lose memories."
        </Title>
        <Text type="secondary">-The Programmer's Brain, Felienne Hermans</Text>
        <Infobox
          title="Spaced Repetition"
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
          title="Progress Tracker"
          description="Monitor your results using the individualized progress tracker"
          link="/progress2.png"
          direct="/progress"
        />
        <Infobox
          title="Why haathee?"
          description="The word haathee originates from the Hindi language and translates to Elephant. They been found to have incredible memories and are one of few species who can recognize their reflection in a mirror."
          link="/elephant.svg"
          direct="https://wonderopolis.org/wonder/do-elephants-ever-forget"
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
          padding: 2em;
          margin: 0 auto;
          justify-content: center;
          text-align: center;
          gap: 1em;
          max-width: 800px;
          display: flex;
          flex-direction: column;
        }
        .home > .ant-btn {
          padding: 3em;
          color: red;
          max-width: 200px;
        }
        #header {
          padding-bottom: 0px;
        }
      `}</style>
    </>
  );
}
export default Info;
