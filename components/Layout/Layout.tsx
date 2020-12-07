import { ReactNode, StrictMode } from "react";
import Head from "next/head";
import SiteHead from "./SiteHead";

type Props = {
  title: string | false;
  header?: string | ReactNode;
  children?: ReactNode;
};

export default function Layout({ title, header, children }: Props) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>{title || "Golazon"}</title>

        <meta name="theme-color" content="#ffffff" />

        <link rel="shortcut icon" href="/favicon.png" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="apple-touch-startup-image" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>

      <div id="app">
        <StrictMode>
          <SiteHead />

          {header && (
            <div className="container block">
              <h1>{header}</h1>
            </div>
          )}

          {children}
        </StrictMode>

        <p className="footer container">
          <a href="https://golazon.com/api/" target="_blank" rel="noreferrer">
            data api
          </a>
          {" • "}
          <a
            href="https://github.com/golazon/golazon"
            target="_blank"
            rel="noreferrer"
          >
            github (source)
          </a>
          {" • "}
          <a
            href="https://github.com/golazon/golazon#readme"
            target="_blank"
            rel="noreferrer"
          >
            about
          </a>
        </p>
      </div>
    </div>
  );
}
