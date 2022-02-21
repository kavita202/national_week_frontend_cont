import { Statistic, Row, Col, Progress, Card } from "antd";
import Graph from "../../components/graph.js";
import TopicData from "../../components/graphtopics.js";
import { API_URL } from "../../config/index.js";
import { useState } from "react";
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
  const [graphData, setGraphData] = useState([]);
  const [topic, setTopic] = useState("");
  let total = 0;
  let average = 0;
  if (data.payload) {
    const { payload } = data;
    total = calculateTotal(payload);
    average = calculateAverage(payload, total);
    collateTopicScores(payload);
  }

  // wrap in a callback to ensure function does not rerender
  function getTopicForGraph(topic) {
    setTopic(topic);
    if (data.payload) {
      const { payload } = data;
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
      {data && total && average ? (
        <>
          <div className="stats">
            <Row type="flex" align="middle" justify="end">
              <Col span={8} align="middle">
                <Statistic title="Quizzes attempted" value={total} />
              </Col>
              <Col span={8} align="middle">
                <Statistic
                  title="Average score"
                  value={average}
                  precision={1}
                  suffix="/ 6"
                />
              </Col>
              <Col span={8} align="middle">
                <Statistic
                  title="Correctly answered"
                  value={" "}
                  prefix={
                    <Progress
                      type="circle"
                      percent={Math.round((average / 6) * 100)}
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
