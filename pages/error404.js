import React, { Component } from "react";
import Link from "next/link";

export default class extends Component {
  componentDidMount() {
    document.title = "404";
  }

  render() {
    return (
      <div className="block error404__wrapper">
        <p>
          Page not found. <Link href="/">Go home</Link> or use the search input
          above.
        </p>
      </div>
    );
  }
}
