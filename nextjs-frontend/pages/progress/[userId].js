import { Statistic, Row, Col, Progress, Card } from "antd";
import "antd/dist/antd.css";
import Header from "../../components/header.js";
import Graph from "../../components/graph.js";
import Script from "next/script";

function calculateAverage(payload, total) {
  const totalScore = payload.reduce((prev, curr) => ({
    score: prev.score + curr.score,
  }));
  return totalScore.score / total;
}

function calculateTotal(payload) {
  return payload.length;
}
function collateTopicScores(payload) {
  const graphdata = [];

  payload.forEach((item) => {
    if (graphdata.find((obj) => obj.topic === item.topic) === undefined) {
      graphdata.push({ topic: item.topic, total: item.score });
    } else {
      let index = graphdata.findIndex((obj) => obj.topic === item.topic);
      console.log(
        (graphdata[index].total =
          Number(graphdata[index].total) + Number(item.score))
      );
    }
  });
  return graphdata;
}

export default function Stats({ data }) {
  console.log(data);
  let total = 0;
  let average = 0;
  let graphData = [];
  if (data.payload) {
    const { payload } = data;
    total = calculateTotal(payload);
    average = calculateAverage(payload, total);
    graphData = collateTopicScores(payload);
    console.log(graphData);
  }

  return (
    <>
      <Header />
      {data && total && average ? (
        <div className="stats">
          <Row gutter={24}>
            <Col span={8}>
              <Statistic title="Quizzes attempted" value={total} />
            </Col>
            <Col span={8}>
              <Statistic
                title="Average score"
                value={average}
                precision={1}
                suffix="/ 6"
              />
            </Col>
            <Col span={8}>
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
          {/* <h2>Average score per topic</h2> */}
          <div className="graph">
            <Graph graphData={graphData} />
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <style jsx>{`
        .stats {
          max-width: 600px;
          margin: auto;
          padding-top: 25px;
        }
        .graph {
          box-shadow: 0 4px 8px 0 grey;
          padding: 50px;
          margin-top: 50px;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps(context) {
  let topic = "all";
  let { userId } = context.query;
  const res = await fetch(`http://localhost:5000/progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      topic: topic,
    }),
  });
  let data = await res.json();
  return { props: { data } };
}
