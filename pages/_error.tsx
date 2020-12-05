import Layout from "components/Layout";

export default function Error({ statusCode }: { statusCode: number }) {
  const errorMessage = !statusCode
    ? "Client error"
    : statusCode === 404
    ? "Page not found"
    : `Server error: ${statusCode}`;

  return (
    <Layout title={false}>
      <div className="container error__wrapper">
        <p>
          <strong>{errorMessage}</strong>
        </p>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
