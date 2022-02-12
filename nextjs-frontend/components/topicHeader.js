import { PageHeader } from "antd";
import { useRouter } from "next/router";

const images = {
  Javascript:
    "https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png",
  Frontend:
    "https://www.logolynx.com/images/logolynx/0d/0d35ef6c8d4fdaf0590228404dc6448b.png",
  Backend: "https://nodejs.org/static/images/logo-hexagon-card.png",
  Database:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTER_wnWHgS2z0Kra1UyKRv-ez3DGqTOP4nzSDq-sYmEkF2m5-Gayi8NNFdATDeVLYYEQI&usqp=CAU",
  Testing:
    "https://seeklogo.com/images/J/jest-logo-F9901EBBF7-seeklogo.com.png",
  React_basics:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png",
  React_advanced: "https://pluginicons.craft-cdn.com/react.svg?1527521614",
  Agile:
    "https://cdn.vectorstock.com/i/thumb-large/69/21/agile-icon-methodology-development-scrum-vector-30766921.jpg",
  Computer_science:
    "https://www.kindpng.com/picc/m/78-786173_computer-science-logo-png-transparent-png.png",
  Architecture: "https://images.ukdissertations.com/119/0520653188015.001.png",
};

function TopicHeader({ topic }) {
  const router = useRouter();

  return (
    <>
      <PageHeader
        className="topic-page-header"
        avatar={{ src: `${images[topic]}`, shape: "square" }}
        onBack={() =>
          router.push({
            pathname: "/topics",
          })
        }
        title={topic}
      />
    </>
  );
}

export default TopicHeader;
