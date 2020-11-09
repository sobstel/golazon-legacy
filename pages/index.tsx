import Layout from "components/layout";
import LiveMatches from "components/live_matches";
import { MAX_CACHE_TIME } from "common/config";

export async function getStaticProps() {
  return { props: {}, revalidate: MAX_CACHE_TIME };
}

export default function IndexPage() {
  return (
    <Layout title={null}>
      <LiveMatches />
    </Layout>
  );
}
