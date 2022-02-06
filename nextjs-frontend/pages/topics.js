import Head from "next/head";

import Layout from "../components/layout";
import TopicPage from "../components/topicpage";
export default function Home() {
  return (
    <div className="container">
      <Layout>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <TopicPage />
        <footer></footer>
      </Layout>
    </div>
  );
}
