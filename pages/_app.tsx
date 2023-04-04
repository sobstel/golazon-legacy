import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { H } from "highlight.run";

H.init("zg006vg9", {
  tracingOrigins: true,
  networkRecording: {
    enabled: true,
    recordHeadersAndBody: true,
    urlBlocklist: [
      // insert urls you don't want to record here
    ],
  },
});

import "nprogress/nprogress.css";
import "../styles/index.scss";

NProgress.configure({ showSpinner: false, minimum: 0 });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function GolazonApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
