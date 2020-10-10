import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "components/layout";
import Fixtures from "components/Fixtures";
import LegacyStandings from "components/competition/standings";
import { MAX_CACHE_TIME } from "lib/config";
import * as History from "lib/history";
import {
  fetchResources,
  useRevalidatingResource,
  resourcePatterns,
} from "lib/hyena";

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const { id } = context.params;

  const [competition] = await fetchResources(
    [resourcePatterns.competition],
    id
  );

  return {
    props: { competition },
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
  const { competition } = props;

  const seasonId = competition?.season?.["season_id"];
  const standings = useRevalidatingResource(
    resourcePatterns.seasonStandings,
    seasonId
  );
  const recentFixtures = useRevalidatingResource(
    resourcePatterns.seasonRecentFixtures,
    seasonId
  );
  const upcomingFixtures = useRevalidatingResource(
    resourcePatterns.seasonUpcomingFixtures,
    seasonId
  );

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
  if (router.isFallback) {
    // TODO: replace with skeleton
    return (
      <Layout title={false}>
        <p className="block wrapped">Loading...</p>
      </Layout>
    );
  }

  // TODO: move to some util/helper
  const fixtures = (recentFixtures || [])
    .slice(recentFixtures?.length - 10)
    .concat(upcomingFixtures?.slice(0, 10) || []);

  return (
    <Layout title={title(competition)}>
      <p className="block nav">
        <Link href="/">
          <a>Golazon</a>
        </Link>
      </p>

      <h1 className="competition__title block wrapped">{title(competition)}</h1>

      <div className="competition__container">
        {fixtures?.length && (
          <div className="block wrapped">
            <Fixtures fixtures={fixtures} />
          </div>
        )}
        {standings && <LegacyStandings rounds={standings} />}
      </div>
    </Layout>
  );
}
