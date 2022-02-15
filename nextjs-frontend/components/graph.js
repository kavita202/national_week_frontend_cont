import React, { useRef } from "react";
import { ColumnChart } from "@opd/g2plot-react";

export default function Graph({ graphData }) {
  console.log(graphData);
  const chartRef = useRef();
  const config = {
    xField: "topic",
    yField: "total",
    xAxis: {
      title: {
        text: "Topic",
        style: {
          fill: "black",
          fontSize: 20,
        },
      },
      label: {
        autoHide: true,
        autoRotate: false,
      },
      tickLine: {
        style: {
          stroke: "black",
          lineWidth: 1,
        },
      },
      label: {
        style: {
          fill: "black",
          fontSize: 15,
        },
      },
    },
    yAxis: {
      title: {
        text: "Average score",
        style: {
          fontSize: 20,
          fill: "black",
        },
      },
      grid: {
        line: false,
      },
      line: {
        lineWidth: 3,
      },
      label: {
        style: {
          fontSize: 15,
          fill: "black",
        },
      },
    },
    // color: "#a8ddb5",
    minColumnWidth: 20,
    maxColumnWidth: 20,
    data: graphData,
    legend: { title: "Average score per topic" },
  };

  return <ColumnChart {...config} chartRef={chartRef} />;
}
