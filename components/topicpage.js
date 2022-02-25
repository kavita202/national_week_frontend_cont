import React from "react";
import Topic from "./topic";

export default function TopicPage() {
  return (
    <div>
      <div className="topic-section">
        <Topic
          title="CSS"
          query="CSS"
          imgPath="https://www.logolynx.com/images/logolynx/0d/0d35ef6c8d4fdaf0590228404dc6448b.png"
        ></Topic>
        <Topic
          query="Javascript"
          title="JavaScript"
          imgPath="https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png"
        ></Topic>
        <Topic
          query="Node"
          title="Node"
          imgPath="https://nodejs.org/static/images/logo-hexagon-card.png"
        ></Topic>
        <Topic
          query="Databases"
          title="Databases"
          imgPath="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTER_wnWHgS2z0Kra1UyKRv-ez3DGqTOP4nzSDq-sYmEkF2m5-Gayi8NNFdATDeVLYYEQI&usqp=CAU"
        ></Topic>
        <Topic
          query="Testing"
          title="Testing"
          imgPath="https://seeklogo.com/images/J/jest-logo-F9901EBBF7-seeklogo.com.png"
        ></Topic>
        <Topic
          query="React"
          title="React"
          imgPath="https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png"
        ></Topic>
        <Topic
          query="Agile"
          title="Agile"
          imgPath="https://www.smartsheet.com/sites/default/files/agile-lifecycle.png"
        ></Topic>
        <Topic
          query="TypeScript"
          title="TypeScript"
          imgPath="https://iconape.com/wp-content/png_logo_vector/typescript.png"
        ></Topic>
        <Topic
          query="Security"
          title="Security"
          imgPath="data:image/png;base64,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"
        ></Topic>
        <Topic
          query="Architecture"
          title="Architecture"
          imgPath="https://images.ukdissertations.com/119/0520653188015.001.png"
        ></Topic>
      </div>
      <style jsx>{`
        .topic-section {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          max-width: 1100px;
          margin: 0 auto;
          justify-content: center;
          gap: 50px;
          padding-top: 30px;
        }
      `}</style>
    </div>
  );
}
