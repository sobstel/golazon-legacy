import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "components/layout";
import Fixtures from "components/Fixtures";
import LegacyStandings from "components/competition/standings";
import { MAX_CACHE_TIME } from "util/config";
import * as History from "util/history";
import { fetchResources, useResource, resourcePatterns } from "util/hyena";

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const { id } = context.params;

  const [{ data: competition, loading }] = await fetchResources(
    [resourcePatterns.competition],
    id
  );

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
        <p className="block wrapped">
          <span className="loader">Loading</span>
        </p>
      </Layout>
    );
  }

  const seasonId = competition?.season?.["season_id"];

  return (
    <Layout title={title(competition)}>
      <p className="block nav">
        <Link href="/">
          <a>Golazon</a>
        </Link>
      </p>

      <h1 className="competition__title block wrapped">{title(competition)}</h1>

      <div className="competition__container">
        <SeasonStandings seasonId={seasonId} />
        <SeasonFixtures seasonId={seasonId} />
      </div>
    </Layout>
  );
}

function SeasonStandings({ seasonId }: { seasonId: string }) {
  const { data: standings } = useResource(
    resourcePatterns.seasonStandings,
    seasonId
  );
  if (!standings) return null;
  return <LegacyStandings rounds={standings} />;
}

function SeasonFixtures({ seasonId }: { seasonId: string }) {
  const { data: recentFixtures, error: recentFixturesError } = useResource(
    resourcePatterns.seasonRecentFixtures,
    seasonId
  ) as { data: Record<string, unknown>[]; error: string };
  const { data: upcomingFixtures, error: upcomingFixturesError } = useResource(
    resourcePatterns.seasonUpcomingFixtures,
    seasonId
  ) as { data: Record<string, unknown>[]; error: string };

  const error = recentFixturesError || upcomingFixturesError;
  if (error) console.log(error);

  // TODO: move to some util/helper
  const fixtures = (recentFixtures || [])
    .slice(recentFixtures?.length ?? -10)
    .concat(upcomingFixtures?.slice(0, 10) || []);

  if (!fixtures?.length) return null;

  return (
    <div className="block wrapped">
      <Fixtures fixtures={fixtures} />
    </div>
  );
}
