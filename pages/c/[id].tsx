import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import { Loader } from "components/Layout";
import LegacyStandings from "components/competition/standings";
import { MAX_CACHE_TIME } from "common/config";
import * as History from "common/history";
import { fetchResources, useResource, resourcePatterns } from "common/hyena";
import PaginatedFixtures from "components/PaginatedFixtures";

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const { id } = context.params;

  const [{ data: competition, loading }] = await fetchResources([
    () => resourcePatterns.competition(id),
  ]);

  return {
    props: { competition, loading },
    revalidate: MAX_CACHE_TIME,
  };
}

const title = (competition) => {
  let title = `${competition.name} ${competition.season.name}`;
  if (competition.area_name) {
    title += ` (${competition.area_name})`;
  }
  if (competition.teamtype) {
    title += ` ${competition.teamtype}`;
  }

  return title;
};

export default function CompetitionPage(props: any) {
  const { competition, loading } = props;

  useEffect(() => {
    if (competition) {
      History.add({
        area_name: competition["area_name"],
        id: competition["competition_id"],
        name: competition["name"],
        teamtype: competition["teamtype"],
      });
    }
  }, [competition]);

  const router = useRouter();
  if (router.isFallback || loading) {
    return (
      <Layout title={false}>
        <p className="container block">
          <span className="loader">Loading</span>
        </p>
      </Layout>
    );
  }

  const seasonId = competition?.season?.["season_id"];

  return (
    <Layout title={title(competition)} header={title(competition)}>
      <div className="competition__container">
        <SeasonRecentMatches seasonId={seasonId} />
        <SeasonUpcomingFixtures seasonId={seasonId} />
        <SeasonStandings seasonId={seasonId} />
      </div>
    </Layout>
  );
}

function SeasonRecentMatches({ seasonId }: { seasonId: string }) {
  const resourceResult = useResource(
    () => seasonId && resourcePatterns.seasonRecentFixtures(seasonId)
  );

  return (
    <PaginatedFixtures
      resourceResult={resourceResult}
      header="Recent matches"
      navigateBackward
    />
  );
}

function SeasonUpcomingFixtures({ seasonId }: { seasonId: string }) {
  const resourceResult = useResource(
    () => seasonId && resourcePatterns.seasonUpcomingFixtures(seasonId)
  );

  return (
    <PaginatedFixtures
      resourceResult={resourceResult}
      header="Upcoming fixtures"
    />
  );
}

function SeasonStandings({ seasonId }: { seasonId: string }) {
  const { data: standings, loading } = useResource(
    () => seasonId && resourcePatterns.seasonStandings(seasonId)
  );
  if (loading && !standings) {
    return <Loader />;
  }
  if (!loading && !standings) return null;
  return <LegacyStandings rounds={standings} />;
}
