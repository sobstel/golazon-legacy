import React, { Component } from "react";
import Link from "next/link";
import Layout from "../components/layout";

export default function Error({ statusCode }) {
  return (
    <Layout>
      <div className="block error__wrapper">
        <p>
          <strong>
            {statusCode ? `Server error: ${statusCode}` : "Client error"}
          </strong>
        </p>
        <p>
          <Link href="/">Go home</Link>.
        </p>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
