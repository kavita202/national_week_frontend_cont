import { Statistic, Row, Col, Progress, Card } from "antd";
// import "antd/dist/antd.css";
import Graph from "../../components/graph.js";
import TopicData from "../../components/graphtopics.js";
import { API_URL } from "../../config/index.js";

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
  const graphdata = [];

  payload.forEach((item) => {
    let index = graphdata.findIndex((obj) => obj.topic === item.topic);
    if (index <= -1) {
      graphdata.push({ topic: item.topic, total: [item.score], average: 0 });
    } else {
      // ;
      graphdata[index].total.push(Number(item.score));
    }
  });
  const graphdataAverage = graphdata.map((item) => ({
    ...item,
    average: round(item.total.reduce((b, a) => a + b) / item.total.length, 1),
  }));
  return graphdataAverage;
}

export default function Stats({ data }) {
  let total = 0;
  let average = 0;
  let graphData = [];
  if (data.payload) {
    const { payload } = data;
    total = calculateTotal(payload);
    average = calculateAverage(payload, total);
    graphData = collateTopicScores(payload);
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
          <div className="graph">
            <h2 style={{ color: "#6B35E8", fontFamily: "Cambria" }}>
              Average score per topic
            </h2>
            <Graph graphData={graphData} />
          </div>
          <div className="topicgraph">
            <TopicData />
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
        .graph {
          box-shadow: 0 4px 8px 0 grey;
          padding: 50px;
          margin-top: 50px;
          max-width: 70%;
          margin: auto;
        }
        .graph > h2 {
          text-align: center;
          padding-bottom: 25px;
          font-size: 2rem;
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
    return { props: { data } };
  },
});
// add a redirect if no user is found
