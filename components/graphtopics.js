import { Layout, Menu, Card, Button } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import { images } from "./images";
import Graph from "./graph";
import { useRouter } from "next/router";

export default function TopicData({ graphData, getTopicForGraph, topic }) {
  const router = useRouter();
  return (
    <Card>
      <Layout
        style={{
          minHeight: "400px",
        }}
      >
        <Sider width={200} breakpoint="lg" collapsedWidth="50">
          <Menu defaultSelectedKeys={["overview"]} mode="inline">
            <Menu.Item
              key="overview"
              onClick={() => getTopicForGraph("overview")}
            >
              Overview
            </Menu.Item>
            {Object.keys(images).map((key) => (
              <Menu.Item
                icon={
                  <img
                    src={images[key]}
                    style={{ height: "20px", width: "20px" }}
                  ></img>
                }
                key={key}
                onClick={() => getTopicForGraph(key)}
              >
                {key}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout id="site-layout">
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0, background: "#fff" }}
          />
          <Content
            style={{
              background: "#fff",
              minHeight: 280,
            }}
          >
            {!Array.isArray(graphData) || !graphData.length ? (
              <>
                <h3 style={{ paddingBottom: "2rem" }}>
                  {`No results found, would you like to attempt a quiz on ${topic} now?`}
                </h3>
                <Button
                  size="large"
                  onClick={() => {
                    router.push({
                      pathname: "/topics/[topic]",
                      query: { topic: topic },
                    });
                  }}
                  type="primary"
                >
                  Attempt Quiz
                </Button>
              </>
            ) : (
              <Graph graphData={graphData} topic={topic} />
            )}
          </Content>
        </Layout>
      </Layout>
    </Card>
  );
}
