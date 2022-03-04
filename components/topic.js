import { useRouter } from "next/router";
import Image from "next/image";

export default function Topic({ title, imgPath, dueDate }) {
  const router = useRouter();
  return (
    <div>
      <div className="topicTitle">
        <h3 className="week-names">{title}</h3>
        {dueDate ? <h3 className="dueDate">{dueDate}</h3> : <></>}
      </div>
      <div
        id={title}
        onClick={() =>
          router.push({
            pathname: "/topics/[topic]",
            query: { topic: title },
          })
        }
        className="topic"
      >
        <Image
          src={imgPath}
          alt={title}
          layout="responsive"
          width={230}
          height={230}
        />
      </div>
      <style jsx>
        {`
          .topic {
            margin: 10px;
            border-radius: 5px;
            width: 230px;
            height: 230px;
            color: rgb(0, 0, 0);
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 3px 10px rgb(30 30 30 / 0.2);
          }
          .topicTitle {
            display: flex;
            justify-content: space-around;
          }
          .week-names {
            padding-left: 12px;
          }
          .dueDate {
            padding-right: 10px;
          }
        `}
      </style>
    </div>
  );
}
