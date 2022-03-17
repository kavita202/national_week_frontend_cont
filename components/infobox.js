import { Card } from "antd";
import Link from "next/link";
import Image from "next/image";
export default function InfoBox({ direct, title, description, link }) {
  return (
    <Link href={direct} passHref>
      <Card
        hoverable
        title={title}
        headStyle={{
          fontSize: "2.2em",
          color: "#5400FF",
          padding: "0 0 1.5em 0",
          borderBottom: "0",
        }}
        bordered={false}
        cover={
          <Image
            src={link}
            alt={title}
            layout="responsive"
            width={380}
            height={280}
          />
        }
        style={{ padding: "30px" }}
      >
        <p style={{ color: "#1E1E1E", fontSize: "1.2em", paddingTop: "1rem" }}>
          {description}
        </p>
      </Card>
    </Link>
  );
}
