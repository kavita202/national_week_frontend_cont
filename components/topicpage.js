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
          imgPath="https://images.assetsdelivery.com/compings_v2/azvector/azvector1811/azvector181100097.jpg"
        ></Topic>
        <Topic
          query="Architecture"
          title="Architecture"
          imgPath="https://nimbus-screenshots.s3.amazonaws.com/s/bec5e003a13e15ef098551d10939f04a.png"
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
