import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";

import "nprogress/nprogress.css";
import "../styles/index.scss";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function GolazonApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
