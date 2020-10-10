import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "components/layout";
import Competitions from "components/Competitions";
import Fixtures from "components/Fixtures";
import getTeam from "services/getTeam";

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const { id } = context.params;
  const result = await getTeam(id);

  return { props: result, revalidate: 1 };
}

// TODO: type: props
export default function TeamPage(props: any) {
  const { team, competitions, recentFixtures, upcomingFixtures } = props;

  const router = useRouter();
  if (router.isFallback) {
    // TODO: replace with skeleton
    return (
      <Layout title={false}>
        <p className="block wrapped">Loading...</p>
      </Layout>
    );
  }

  const fixtures = recentFixtures
    ?.slice(recentFixtures.length - 5)
    .concat(upcomingFixtures?.slice(0, 5));

  return (
    <Layout title={team.name}>
      <p className="block nav">
        <Link href="/">
          <a>Golazon</a>
        </Link>
      </p>
      <h1 className="team__title block wrapped">{team.name}</h1>
      <div className="team__container">
        <Competitions competitions={competitions} />
        {fixtures?.length && (
          <div className="block wrapped">
            <Fixtures fixtures={fixtures} />
          </div>
        )}
      </div>
    </Layout>
  );
}
