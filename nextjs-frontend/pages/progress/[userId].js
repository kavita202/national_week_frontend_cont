// get server side props
// fetch data for user performance done
// send request using autho0 user sub
// for statistics: number of quizzes attempted and average score

// for graph:
import { Statistic, Row, Col, Progress } from "antd";
import "antd/dist/antd.css";
import { Column } from "@antv/g2plot";
import Header from "../../components/header.js";

function calculateAverage(payload, total) {
  const graphData = [];
  const totalScore = payload.reduce((prev, curr) => ({
    score: prev.score + curr.score,
  }));
  return totalScore.score / total;
}

function calculateTotal(payload) {
  return payload.length;
}
function collateTopicScores(payload) {
  // if topic not in array add as an object  with its score in array
  // if it is in array, update the array to have the new score
  // calculate the average for each of the topics = data for graph
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

//  else {
//     const ind = graphData.findIndex(object => object.topic !== obj.topic)
//     graphData = [graphData.slice(0, ind), ...{topic: obj.topic, ...score:[]}

export default function Stats({ data }) {
  console.log(data);
  let total = 0;
  let average = 0;
  if (data.payload) {
    const { payload } = data;
    total = calculateTotal(payload);
    average = calculateAverage(payload, total);
    console.log(total, average);
    const graphData = collateTopicScores(payload);
  }

  return (
    <>
      <Header />
      {data && total && average ? (
        <Row gutter={12}>
          <Col span={6}>
            <Statistic title="Quizzes attempted" value={total} />
          </Col>
          <Col span={6}>
            <Statistic
              title="Average score"
              value={average}
              precision={1}
              suffix="/ 6"
            />
          </Col>
          <Col span={6}>
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
      ) : (
        <div></div>
      )}
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
