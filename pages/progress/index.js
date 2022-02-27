import { Statistic, Row, Col, Progress, Card } from "antd";
import TopicData from "../../components/graphtopics.js";
import { API_URL } from "../../config/index.js";
import { useState, useMemo } from "react";
import {
  getSession,
  userProfile,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";

function calculateAverage(payload, total) {
  const totalScore = payload.reduce((prev, curr) => ({
    score: prev.score + curr.score,
  }));
  return totalScore.score / total;
}

function calculateTotal(payload) {
  return payload.length;
}
function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

function collateTopicScores(payload) {
  let graphDataOverview = [];
  payload.forEach((item) => {
    let index = graphDataOverview.findIndex((obj) => obj.topic === item.topic);
    if (index <= -1) {
      graphDataOverview.push({
        topic: item.topic,
        total: [item.score],
        average: 0,
      });
    } else {
      // ;
      graphDataOverview[index].total.push(Number(item.score));
    }
  });
  const Average = graphDataOverview.map((item) => ({
    ...item,
    average: round(item.total.reduce((b, a) => a + b) / item.total.length, 1),
  }));
  return Average;
}

export default function Stats({ data }) {
  const [Total, setTotal] = useState(0);
  const [Average, setAverage] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [topic, setTopic] = useState("");
  const [overviewData, setOverviewData] = useState({});

  let total = 0;
  let average = 0;

  // this should be wrapped in a usememo
  const calculation = useMemo(() => {
    if (data.payload) {
      const { payload } = data;
      total = calculateTotal(payload);
      setTotal(total);
      average = calculateAverage(payload, total);
      setAverage(average);
      const overviewdata = collateTopicScores(payload);
      setOverviewData(overviewdata);
    }
  }, [data]);

  function getTopicForGraph(topic) {
    const { payload } = data;
    if (topic === "overview") {
      setGraphData(overviewData);
    }
    setTopic(topic);
    if (data.payload && topic !== "overview") {
      const topicData = payload.filter((item) => {
        return item.topic.toLowerCase() === topic.toLowerCase();
      });
      const topicDataParsed = topicData.map((item) => {
        // let newtime = new Date(item.time).toString().slice(5, 3);
        let newtime = `${new Date(item.time).getDate()}/${
          new Date(item.time).getMonth() + 1
        }`;
        return { ...item, time: newtime };
      });
      setGraphData(topicDataParsed);
    }

    // find a function to reduce the date (date())
  }

  return (
    <>
      {data ? (
        <>
          <div className="stats">
            <Row type="flex" align="middle" justify="end">
              <Col span={8} align="middle">
                <Statistic title="Quizzes attempted" value={Total} />
              </Col>
              <Col span={8} align="middle">
                <Statistic
                  title="Average score"
                  value={Average}
                  precision={1}
                />
              </Col>
              <Col span={8} align="middle">
                <Statistic
                  title="Correctly answered"
                  value={" "}
                  prefix={
                    <Progress
                      type="circle"
                      percent={Math.round((Average / 10) * 100)}
                      width={60}
                    />
                  }
                />
              </Col>
            </Row>
          </div>
          <div className="topicgraph">
            <TopicData
              graphData={graphData}
              getTopicForGraph={getTopicForGraph}
              topic={topic}
            />
          </div>
        </>
      ) : (
        <div></div>
      )}
      <style jsx>{`
        .stats {
          max-width: 600px;
          margin: auto;
          padding: 25px 0;
          width: 90%;
        }

        .topicgraph {
          max-width: 70%;
          margin: auto;
          padding-top: 50px;
        }

        @media only screen and (max-width: 700px) {
          .topicgraph {
            max-width: 90%;
          }
        }
      `}</style>
    </>
  );
}
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    let topic = "all";
    const res = await fetch(`${API_URL}/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.sub,
        topic: topic,
      }),
    });
    let data = await res.json();
    if (data.payload.length === 0) {
      return {
        redirect: {
          permanent: false,
          destination: "/topics",
        },
      };
    }
    return { props: { data } };
  },
});
// add a redirect if no user is found
