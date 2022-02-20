import { Card } from "antd";
import Link from "next/link";

export default function InfoBox({ direct, title, description, link }) {
  return (
    <Link href={direct}>
      <Card
        hoverable
        title={title}
        headStyle={{
          fontSize: "1.5rem",
          color: "#5400FF",
          paddingBottom: "10px",
        }}
        bordered={false}
        cover={<img src={link} alt={title} />}
        style={{ padding: "30px" }}
      >
        <p style={{ color: "#1E1E1E", fontSize: "0.9rem" }}>{description}</p>
      </Card>
    </Link>
  );
}
