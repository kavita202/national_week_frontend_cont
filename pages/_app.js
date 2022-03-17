import React, { useEffect } from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import Header from "../components/header.js";
import "antd/dist/antd.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import "../styles.css";

export default function App({ Component, pageProps }) {
  NProgress.configure({
    showSpinner: false,
  });
  useEffect(() => {
    Router.events.on("routeChangeStart", NProgress.start);
    Router.events.on("routeChangeComplete", NProgress.done);
    Router.events.on("routeChangeError", NProgress.done);
    return () => {
      Router.events.off("routeChangeStart", NProgress.start);
      Router.events.off("routeChangeComplete", NProgress.done);
      Router.events.off("routeChangeError", NProgress.done);
    };
  }, []);

  return (
    <UserProvider>
      <Header />
      <Component {...pageProps} />
    </UserProvider>
  );
}
