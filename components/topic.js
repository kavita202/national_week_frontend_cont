import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";
export default function Topic({ title, imgPath, dueDate }) {
  // console.log(Date.parse(dueDate) - Date.parse(new Date()));
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/topics/[topic]");
  }, []);

  return (
    <div
      onClick={() =>
        router.push({
          pathname: "/topics/[topic]",
          query: { topic: title },
        })
      }
    >
      {dueDate ? (
        <div className="topicTitle">
          <h2 className="week-names">{title}</h2>
          <p
            style={
              Date.parse(dueDate) - Date.parse(new Date()) < 0
                ? { color: "red" }
                : { color: "#1E1E1E" }
            }
            className="dueDate"
          >
            {new Date(dueDate).toString().slice(4, 15)}
          </p>
        </div>
      ) : (
        <div className="topicTitle">
          <h2>{title}</h2>
        </div>
      )}

      <div id={title} className="topic">
        <Image
          src={imgPath}
          alt={title}
          layout="responsive"
          width={230}
          height={230}
          priority
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
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .dueDate {
            margin: 0;
            font-weight: 600;
          }
          .week-names {
            margin: 0;
          }
        `}
      </style>
    </div>
  );
}

// add conditional color if date is passed today
