import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_CACHE_TIME } from "common/config";
import { fetchResources, resourcePatterns } from "common/hyena";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const [{ data: competition }] = await fetchResources([
    () => resourcePatterns.competition(id as string),
  ]);

  // @ts-expect-error
  const seasonId = competition?.season["season_id"] ?? null;

  const [
    { data: standings },
    { data: recentFixtures },
    { data: upcomingFixtures },
  ] = await fetchResources([
    () => resourcePatterns.seasonStandings(seasonId),
    () => resourcePatterns.seasonRecentFixtures(seasonId),
    () => resourcePatterns.seasonUpcomingFixtures(seasonId),
  ]);

  res.setHeader(
    "Cache-Control",
    `s-maxage=${DEFAULT_CACHE_TIME}, stale-while-revalidate`
  );
  res
    .status(200)
    .json({ competition, standings, recentFixtures, upcomingFixtures });
};
