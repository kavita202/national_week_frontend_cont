import Head from "next/head";
import Layout from "../../components/layout.js";
import TopicPage from "../../components/topicpage";
// import "antd/dist/antd.css";

export default function Home() {
  return (
    <div className="container">
      <Layout>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <TopicPage />
        <footer></footer>
      </Layout>
    </div>
  );
}
