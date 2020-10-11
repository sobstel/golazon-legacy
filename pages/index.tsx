import dynamic from "next/dynamic";
import Layout from "components/layout";
import { MAX_CACHE_TIME } from "lib/config";

const LiveMatches = dynamic(() => import("components/live_matches"), {
  ssr: true,
});

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
