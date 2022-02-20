import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import Header from "../components/header.js";
import "antd/dist/antd.css";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Header />
      <Component {...pageProps} />
    </UserProvider>
  );
}
