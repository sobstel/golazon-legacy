import { useRouter } from "next/router";
import Layout from "components/layout";
import Competitions from "components/Competitions";
import Fixtures from "components/Fixtures";
import { MAX_CACHE_TIME } from "common/config";
import { fetchResources, resourcePatterns, useResource } from "common/hyena";
import mergeFixtures from "common/util/mergeFixtures";
import Loader from "components/Loader";

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
    return (
      <Layout title={false}>
        <div className="block wrapped">
          <p className="loader">Loading</p>
        </div>
      </Layout>
    );
  }

  const teamId = team?.["team_id"];

  return (
    <Layout title={team.name}>
      <h1 className="team__title block wrapped">{team.name}</h1>
      <div className="team__container">
        <Competitions competitions={competitions} />
        <TeamFixtures teamId={teamId} />
      </div>
    </Layout>
  );
}

function TeamFixtures({ teamId }: { teamId: string }) {
  const {
    data: recentFixtures,
    error: recentFixturesError,
    loading: recentFixturesLoading,
  } = useResource(() => teamId && resourcePatterns.teamRecentFixtures(teamId));
  const {
    data: upcomingFixtures,
    error: upcomingFixturesError,
    loading: upcomingFixturesLoading,
  } = useResource(
    () => teamId && resourcePatterns.teamUpcomingFixtures(teamId)
  );

  const error = recentFixturesError || upcomingFixturesError;
  if (error) console.log(error);

  const fixtures = mergeFixtures(recentFixtures, upcomingFixtures, 8);

  const loading = recentFixturesLoading || upcomingFixturesLoading;
  if (!loading && !fixtures?.length) return null;

  return (
    <div className="block wrapped">
      {recentFixturesLoading && (
        <Loader text="Loading recent fixtures" noWrapper />
      )}
      <Fixtures fixtures={fixtures} />
      {upcomingFixturesLoading && (
        <Loader text="Loading upcoming fixtures" noWrapper />
      )}
    </div>
  );
}
