import { Layout, Menu, Card } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import { images } from "./images";
import Graph from "./graph";
export default function TopicData({ graphData, getTopicForGraph, topic }) {
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
              <h3 style={{ textAlign: "center" }}>
                No results found, please attempt quizzes for this topic
              </h3>
            ) : (
              <Graph graphData={graphData} topic={topic} />
            )}
          </Content>
        </Layout>
      </Layout>
    </Card>
  );
}
