import { useRouter } from "next/router";
import Layout from "components/Layout";
import { Competitions } from "components/Layout";
import { MAX_CACHE_TIME } from "common/config";
import { fetchResources, resourcePatterns, useResource } from "common/hyena";
import PaginatedFixtures from "components/PaginatedFixtures";

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const { id } = context.params;

  const [
    { data: team, loading: teamLoading },
    { data: competitions, loading: competitionsLoading },
  ] = await fetchResources([
    () => resourcePatterns.team(id),
    () => resourcePatterns.teamCompetitions(id),
  ]);

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
        <div className="container block">
          <p className="loader">Loading</p>
        </div>
      </Layout>
    );
  }

  const teamId = team?.["team_id"];

  return (
    <Layout title={team.name} header={team.name}>
      <div className="team__container">
        <Competitions competitions={competitions} />
        <TeamRecentMatches teamId={teamId} />
        <TeamUpcomingFixtures teamId={teamId} />
      </div>
    </Layout>
  );
}

function TeamRecentMatches({ teamId }: { teamId: string }) {
  const resourceResult = useResource(
    () => teamId && resourcePatterns.teamRecentFixtures(teamId)
  );

  return (
    <PaginatedFixtures
      resourceResult={resourceResult}
      header="Recent matches"
      initialPage="last"
    />
  );
}

function TeamUpcomingFixtures({ teamId }: { teamId: string }) {
  const resourceResult = useResource(
    () => teamId && resourcePatterns.teamUpcomingFixtures(teamId)
  );

  return (
    <PaginatedFixtures
      resourceResult={resourceResult}
      header="Upcoming fixtures"
      initialPage="last"
    />
  );
}
