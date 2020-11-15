import { StrictMode } from "react";
import Head from "next/head";
import Search from "../features/search";

export default function Layout({ children, title }) {
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
          <Search />

          {children}
        </StrictMode>

        <p className="disclaimer block">
          football data mnmlist way (
          <a
            href="https://github.com/sobstel/golazon"
            target="_blank"
            rel="noreferrer"
          >
            source
          </a>
          )
        </p>
      </div>
    </div>
  );
}
