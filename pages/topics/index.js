import Head from "next/head";
import Layout from "../../components/layout.js";
import Topic from "../../components/topic";
import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { API_URL } from "../../config/index.js";
import { topics } from "../../components/images.js";
import { useEffect, useState } from "react";

// topic requires query,
export default function Home({ data }) {
  const [repeatData, setRepeatData] = useState([]);
  let formattedData = {};

  useEffect(() => {
    if (data) {
      data.payload.forEach((obj) => {
        let items = obj.row.split(",");
        let topicValue = items[0].slice(1);
        let dueDateValue = new Date(items[1].slice(1, 11))
          .toString()
          .slice(4, 10);
        formattedData = { ...formattedData, [topicValue]: dueDateValue };
      });
      setRepeatData(formattedData);
    }
  }, [data]);
  return (
    <div className="container">
      <Layout>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="topic-section">
          {topics.map((topic) => {
            // if (topic[0] in repeatData) {
            //   return (
            //     <Topic
            //       key={topic[0]}
            //       title={topic[0]}
            //       imgPath={topic[1]}
            //       dueDate={repeatData[topic[0]]}
            //     />
            //   );
            // } else {
            return (
              <Topic
                key={topic[0]}
                title={topic[0]}
                imgPath={topic[1]}
                dueDate=""
              />
            );
          })}
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
      </Layout>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    const response = await fetch(`${API_URL}/repeat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.sub,
      }),
    });
    let data = await response.json();
    return { props: { data } };
  },
});
