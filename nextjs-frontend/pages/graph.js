import React, { useRef } from "react";
import { ColumnChart } from "@opd/g2plot-react";

const config = {
  xField: "topic",
  yField: "total",
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    type: {
      alias: "类别",
    },
    sales: {
      alias: "销售额",
    },
  },
  minColumnWidth: 20,
  maxColumnWidth: 20,
  data: [
    {
      topic: "javascript",
      total: 3,
    },
    {
      topic: "backend",
      total: 6,
    },
  ],
};

export default () => {
  const chartRef = useRef();
  return <ColumnChart {...config} chartRef={chartRef} />;
};
