import React, { useRef } from "react";
import { ColumnChart } from "@opd/g2plot-react";

export default function Graph({ graphData }) {
  const chartRef = useRef();
  const config = {
    xField: "topic",
    yField: "average",
    seriesField: ["average", "topic"],
    color: "#1E1E1E",
    xAxis: {
      title: {
        text: "Topic",
        style: {
          fill: "black",
          fontSize: 20,
          fontFamily: "Cambria",
        },
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
          fontFamily: "Cambria",
        },
      },
    },
    yAxis: {
      title: {
        text: "Average score",
        style: {
          fontSize: 20,
          fill: "black",
          fontFamily: "Cambria",
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
          fontFamily: "Cambria",
        },
      },
    },
    minColumnWidth: 20,
    maxColumnWidth: 30,
    data: graphData,
  };

  return <ColumnChart {...config} chartRef={chartRef} />;
}
