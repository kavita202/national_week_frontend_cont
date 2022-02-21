import React, { useRef } from "react";
import { ColumnChart } from "@opd/g2plot-react";

export default function Graph({ graphData, yAxis, xAxis }) {
  console.log(graphData);
  const chartRef = useRef();
  const config = {
    xField: "time",
    yField: "score",
    // seriesField: ["average", "topic"],
    color: "#1E1E1E",
    xAxis: {
      title: {
        text: "Score",
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
          fontSize: 20,
          fontFamily: "Cambria",
        },
      },
    },
    yAxis: {
      title: {
        text: "Date",
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
          fontSize: 20,
          fill: "black",
          fontFamily: "Cambria",
        },
      },
    },
    minColumnWidth: 20,
    maxColumnWidth: 30,
    data: graphData,
  };

  return (
    <div className="graph">
      <ColumnChart {...config} chartRef={chartRef} />
      <style jsx>{`
        .graph {
          // box-shadow: 0 4px 8px 0 grey;
          padding: 20px;
          margin-top: 50px;
          max-width: 90%;
          margin: auto;
        }
        .graph > h2 {
          text-align: center;
          padding-bottom: 10px;
          font-size: 1.5em;
        }
      `}</style>
    </div>
  );
}
