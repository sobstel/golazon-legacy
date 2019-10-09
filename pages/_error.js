import React, { Component } from "react";
import Link from "next/link";
import Layout from "../components/layout";

export default function Error({ statusCode }) {
  return (
    <Layout>
      <div className="block error__wrapper">
        <p>
          <strong>
            <em>
              {statusCode ? `Server error: ${statusCode}` : "Client error"}
            </em>
          </strong>
        </p>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
