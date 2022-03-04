import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { Menu } from "antd";
import "antd/dist/antd.css";
import {
  UserOutlined,
  SettingOutlined,
  LineChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
export default function Header() {
  const { user } = useUser();

  return (
    <Menu mode="horizontal" theme="light">
      <Menu.Item key="Home">
        <Link href="/">
          <h3>
            <a>School of Quizzes</a>
          </h3>
        </Link>
      </Menu.Item>
      <Menu.Item key="Extra">
        <Link href="/topics">
          <h3>
            <a>Topics</a>
          </h3>
        </Link>
      </Menu.Item>

      {user ? (
        <SubMenu
          key="SubMenu"
          icon={
            <img
              src={user.picture}
              style={{
                height: "35px",
                width: "35px",
                alignItems: "center",
                margin: "2px 0 0 10px",
              }}
            />
          }
          style={{ marginLeft: "auto" }}
        >
          <Menu.ItemGroup>
            <Menu.Item key="progress" icon={<LineChartOutlined />}>
              <Link href="/progress">
                <a>Progress</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
              <a href="/">Settings</a>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
              <a href="/api/auth/logout" key="logout">
                Log out
              </a>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      ) : (
        <>
          <Menu.Item key="login" style={{ marginLeft: "auto" }}>
            <h3>
              <a href="/api/auth/login" key="login">
                Log in
              </a>
            </h3>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}
