import App from "next/app";
import Search from "../components/search";
import "../styles/index.less";

class GolazonApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <div id="app">
        <Search />

        <Component {...pageProps} />

        <p className="disclaimer block">
          football data mnmlist way (
          <a href="https://github.com/sobstel/golazon" target="_blank">
            source
          </a>
          )
        </p>
      </div>
    );
  }
}

export default GolazonApp;
