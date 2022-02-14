import { Column } from "@antv/g2plot";

const data = [
  {
    topic: "javascript",
    total: 3,
  },
  {
    topic: "backend",
    total: 6,
  },
];

const columnPlot = new Column("container", {
  data,
  xField: "type",
  yField: "sales",
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
});

columnPlot.render();
