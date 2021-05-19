import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_CACHE_TIME } from "common/config";
import { fetchResources, resourcePatterns } from "common/hyena";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  if (typeof id !== "string") {
    res.status(400);
    return;
  }

  const [{ data: competition }] = await fetchResources([
    () => resourcePatterns.competition(id),
  ]);

  const seasonId = competition?.["season"]?.["season_id"] ?? null;

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
