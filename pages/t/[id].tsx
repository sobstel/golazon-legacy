import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "components/layout";
import Competitions from "components/Competitions";
import Fixtures from "components/Fixtures";
import { MAX_CACHE_TIME } from "util/config";
import { fetchResources, resourcePatterns, useResource } from "util/hyena";
import mergeFixtures from "util/mergeFixtures";

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const { id } = context.params;

  const [
    { data: team, loading: teamLoading },
    { data: competitions, loading: competitionsLoading },
  ] = await fetchResources(
    [resourcePatterns.team, resourcePatterns.teamCompetitions],
    id
  );

  return {
    props: { team, competitions, loading: teamLoading || competitionsLoading },
    revalidate: MAX_CACHE_TIME,
  };
}

// TODO: type: props
export default function TeamPage(props: any) {
  const { team, competitions, loading } = props;

  const router = useRouter();
  if (router.isFallback || loading) {
    // TODO: replace with skeleton
    return (
      <Layout title={false}>
        <p className="block wrapped">
          <span className="loader">Loading</span>
        </p>
      </Layout>
    );
  }

  const teamId = team?.["team_id"];

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
        <TeamFixtures teamId={teamId} />
      </div>
    </Layout>
  );
}

function TeamFixtures({ teamId }: { teamId: string }) {
  const { data: recentFixtures, error: recentFixturesError } = useResource(
    resourcePatterns.teamRecentFixtures,
    teamId
  ) as { data: Record<string, unknown>[]; error: string };
  const { data: upcomingFixtures, error: upcomingFixturesError } = useResource(
    resourcePatterns.teamUpcomingFixtures,
    teamId
  ) as { data: Record<string, unknown>[]; error: string };

  const error = recentFixturesError || upcomingFixturesError;
  if (error) console.log(error);

  const fixtures = mergeFixtures(recentFixtures, upcomingFixtures, 8);

  if (!fixtures?.length) return null;

  return (
    <div className="block wrapped">
      <Fixtures fixtures={fixtures} />
    </div>
  );
}
