import Layout from "components/layout";
import LiveMatches from "components/live_matches";
import { MAX_CACHE_TIME } from "lib/config";

export async function getStaticProps() {
  return { props: {}, revalidate: MAX_CACHE_TIME };
}

export default function Index() {
  return (
    <Layout title={null}>
      <LiveMatches />
    </Layout>
  );
}
