import { Table, Tooltip } from "antd";
import Link from "next/link";
function isDateBeforeToday(date) {
  return new Date(date) < new Date(new Date().toDateString());
}
// for topic - render a link to click on topic to take you to quiz
// for due date render such that if in future - black, past - render red and within 2 days - orange
export default function TableData({ data }) {
  let formattedData = [];

  // convert the date to a nicer format
  data.forEach((obj) => {
    let items = obj.row.split(",");
    let topicValue = items[0].slice(1);
    let dueDateValue = new Date(items[1].slice(1, 11)).toString().slice(0, 15);
    formattedData = [
      ...formattedData,
      { topic: topicValue, dueDate: dueDateValue },
    ];
  });
  console.log(formattedData);

  const columns = [
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      render: (text) => (
        <Link href={`/topics/${text}`}>
          <Tooltip placement="leftTop" title={"Attempt quiz"}>
            <a style={{ color: "black", marginTop: 0 }}>{text}</a>
          </Tooltip>
        </Link>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) =>
        isDateBeforeToday(text) ? (
          <p style={{ color: "red", paddingTop: "12px" }}>{text}</p>
        ) : (
          <p style={{ paddingTop: "12px" }}>{text}</p>
        ),
    },
  ];

  return (
    <Table
      size={"sm"}
      title={() => "When should you next complete a quiz?"}
      className="table"
      pagination={{ hideOnSinglePage: true }}
      columns={columns}
      dataSource={formattedData}
    />
  );
}
