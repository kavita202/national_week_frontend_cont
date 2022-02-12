import Image from "next/image";
import { Carousel } from "antd";

function Info({ imgPath, description, title, text }) {
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <Carousel autoplay>
      <div>
        <h3 style={contentStyle}></h3>
        <h2>{title}</h2>
        <Image
          src="https://miro.medium.com/max/1838/1*IH57PdfGRYTESy0nuMWx3w.png"
          alt={description}
          layout="responsive"
          width={300}
          height={300}
        />
        <div>{text}</div>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
}
export default Info;
