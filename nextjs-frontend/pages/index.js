import React from "react";
import Link from "next/link";
import Info from "../components/info";
import Header from "../components/header.js";
const Home = () => {
  return (
    <div>
      <Header />
      <Info
        description="the forgetting curve"
        text="Challenging the forgetting curve"
      />
    </div>
  );
};

export default Home;
