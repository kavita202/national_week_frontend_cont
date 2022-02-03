import React from "react";
import Topic from "./topic";

export default function TopicPage() {
  return (
    <div>
      <h2>Click on a topic!</h2>
      <div className="topic-section">
        <Topic
          title=" Week 2 - Javascript"
          query="javascript"
          imgPath="https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png"
        ></Topic>
        <Topic
          query="frontend"
          title="Week 3- Front End"
          imgPath="https://www.logolynx.com/images/logolynx/0d/0d35ef6c8d4fdaf0590228404dc6448b.png"
        ></Topic>
        <Topic
          query="backend"
          title="Week 4 - Back End"
          imgPath="https://nodejs.org/static/images/logo-hexagon-card.png"
        ></Topic>
        <Topic
          query="database"
          title="Week 5 - Databases"
          imgPath="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTER_wnWHgS2z0Kra1UyKRv-ez3DGqTOP4nzSDq-sYmEkF2m5-Gayi8NNFdATDeVLYYEQI&usqp=CAU"
        ></Topic>
        <Topic
          query="testing"
          title="Week 6 - Testing"
          imgPath="https://seeklogo.com/images/J/jest-logo-F9901EBBF7-seeklogo.com.png"
        ></Topic>
        <Topic
          query="react_basics"
          title="Week 7 - React Basics"
          imgPath="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png"
        ></Topic>
        <Topic
          query="react_advanced"
          title="Week 8 - React Advanced"
          imgPath="https://pluginicons.craft-cdn.com/react.svg?1527521614"
        ></Topic>
        <Topic
          title="Week 9 - Agile"
          imgPath="https://cdn.vectorstock.com/i/thumb-large/69/21/agile-icon-methodology-development-scrum-vector-30766921.jpg"
        ></Topic>
        <Topic
          title="Week 10 - Computer Science"
          imgPath="https://www.kindpng.com/picc/m/78-786173_computer-science-logo-png-transparent-png.png"
        ></Topic>
        <Topic
          title="Week 11 - Architecture"
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
        }
      `}</style>
    </div>
  );
}
