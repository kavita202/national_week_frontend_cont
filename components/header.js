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

  // function countDownDelay() {
  //   setTimeout(function countDown() {
  //     console.log(window.location.href);
  //     let secondsToGo = 3;
  //     const modal = Modal.success({
  //       title: "Logout successful",
  //     });
  //     const timer = setInterval(() => {
  //       secondsToGo -= 1;
  //     }, 1000);
  //     setTimeout(() => {
  //       clearInterval(timer);
  //     }, secondsToGo * 1000);
  //   }, 2000);
  // }

  return (
    <Menu mode="horizontal" theme="light" style={{ paddingTop: "12px" }}>
      <Menu.Item key="Home" style={{ margin: "0 10px" }}>
        <Link href="/">
          <a>
            {" "}
            <GiElephant size={"3.5em"} />
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
            <Menu.Item
              key="logout"
              icon={<LogoutOutlined />}
              // onClick={countDownDelay}
            >
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
