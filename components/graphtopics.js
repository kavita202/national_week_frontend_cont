import { Layout, Menu, Breadcrumb } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
import { images } from "./images";
import Graph from "./graph";
import React, { useState } from "react";
export default function TopicData({ graphData, getTopicForGraph, topic }) {
  const [collapsed, setCollapsed] = useState(false);

  function onCollapse() {
    setCollapsed(!collapsed);
  }
  return (
    <Layout
      style={{
        minHeight: "400px",
      }}
    >
      <Sider width={200} collapsible collapsed={collapsed} trigger={null}>
        <Menu defaultSelectedKeys={["overview"]} mode="inline">
          <Menu.Item key="overview">Overview</Menu.Item>
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
          className="site-layout-background"
          style={{
            padding: 0,
            background: "#fff",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              onClick: onCollapse,
              className: "trigger",
              style: {
                padding: "0 24px",
                fontSize: "24px",
                lineHeight: "64px",
                cursor: "pointer",
                transition: "color 0.3s",
              },
              hover: { color: "red" },
            }
          )}
        </Header>
        <Content
          style={{
            background: "#fff",
            margin: "24px 16px",
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          <Graph graphData={graphData} topic={topic} />
        </Content>
      </Layout>
    </Layout>
  );
}
