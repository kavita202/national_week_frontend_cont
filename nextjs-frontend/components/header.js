import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { Menu } from "antd";
import "antd/dist/antd.css";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;
export default function Header() {
  const { user } = useUser();
  console.log(user);
  console.log(user);
  return (
    <Menu mode="horizontal">
      <Menu.Item key="Home">
        <Link href="/">
          <h2>
            <a>School of Quizzes</a>
          </h2>
        </Link>
      </Menu.Item>
      <Menu.Item key="Home2">
        <Link href="/">
          <h3>
            <a>Home</a>
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
            <UserOutlined
              style={{
                fontSize: "24px",
                color: "#08c",
                padding: "15px 0 0 10px",
              }}
              theme="outlined"
            />
          }
          style={{ marginLeft: "auto" }}
        >
          <Menu.ItemGroup>
            <Menu.Item key="user">{user.nickname}</Menu.Item>
            <Menu.Item key="progress">
              <a href="/api/auth/logout">Progress</a>
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
              <a href="/">Settings</a>
            </Menu.Item>
            <Menu.Item key="logout">
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
