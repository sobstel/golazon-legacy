import Head from "next/head";
import Search from "./search";
import "../styles/index.less";

export default function Layout({ children, title }) {
  return (
    <div>
      <Head>
        <title>{title || "Golazon"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div id="app">
        <Search />

        {children}

        <p className="disclaimer block">
          football data mnmlist way (
          <a href="https://github.com/sobstel/golazon" target="_blank">
            source
          </a>
          )
        </p>
      </div>
    </div>
  );
}
