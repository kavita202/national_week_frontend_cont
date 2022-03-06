import { Card } from "antd";
import Link from "next/link";
import Image from "next/image";
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
        // change to next image tag!
        cover={
          <Image
            src={link}
            alt={title}
            layout="intrinsic"
            width={500}
            height={370}
          />
        }
        style={{ padding: "30px" }}
      >
        <p style={{ color: "#1E1E1E", fontSize: "1rem" }}>{description}</p>
      </Card>
    </Link>
  );
}
