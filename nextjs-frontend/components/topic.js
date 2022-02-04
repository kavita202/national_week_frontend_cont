import { useRouter } from "next/router";
import Image from "next/image";
export default function Topic({ title, imgPath, query }) {
  const router = useRouter();

  return (
    <div>
      <h3 className="week-names">{title}</h3>
      <div
        id={title}
        onClick={() =>
          router.push({
            pathname: "/questions/[topic]",
            query: { topic: query },
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
            box-shadow: 0 4px 8px 0 #caf0f8;
          }
        `}
      </style>
    </div>
  );
}
