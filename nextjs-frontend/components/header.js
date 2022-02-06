import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { Menu } from "antd";
import "antd/dist/antd.css";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;
export default function Header() {
  const { user } = useUser();
  console.log(<Menu.Item />);
  return (
    <Menu mode="horizontal">
      <Menu.Item key="Home">
        <Link href="/">
          <a>School of Quizzes</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="Extra">
        <Link href="/resources">
          <a>Extra Resources</a>
        </Link>
      </Menu.Item>

      {user ? (
        <SubMenu key="SubMenu" icon={<UserOutlined />}>
          <Menu.ItemGroup>
            <Menu.Item key="logout">
              {" "}
              <a href="/api/auth/logout"> Progress tracker</a>
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
              <a href="/">Settings</a>{" "}
            </Menu.Item>
            <Menu.Item key="logout">
              <a href="/api/auth/logout" key="logout">
                Logout
              </a>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      ) : (
        <>
          <Menu.Item key="login">
            <a href="/api/auth/login" key="login">
              {" "}
              Login
            </a>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}
