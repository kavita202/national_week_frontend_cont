import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { Menu, Button } from "antd";
import "antd/dist/antd.css";
import {
  SettingOutlined,
  LineChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { GiElephant } from "react-icons/gi";

const { SubMenu } = Menu;
export default function Header() {
  const { user } = useUser();

  return (
    <Menu mode="horizontal" theme="light" style={{ alignItems: "center" }}>
      <Menu.Item key="Home" style={{ paddingTop: ".8em" }}>
        <Link href="/">
          <a>
            <GiElephant size={"2em"} />
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="Extra">
        <Link href="/topics" passHref>
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
                margin: "10px 0 10px 10px",
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
          <Menu.Item
            className="noHover"
            key="login"
            style={{ marginLeft: "auto" }}
          >
            <Button type="primary">
              <a href="/api/auth/login" key="login">
                Log in
              </a>
            </Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}
