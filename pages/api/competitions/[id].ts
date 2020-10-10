import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_CACHE_TIME } from "lib/config";
import { fetchResources, resourcePatterns } from "lib/hyena";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const [competition] = await fetchResources(
    [resourcePatterns.competition],
    id
  );
  const seasonId = competition.season["season_id"];

  const [standings, recentFixtures, upcomingFixtures] = await fetchResources(
    [
      resourcePatterns.seasonStandings,
      resourcePatterns.seasonRecentFixtures,
      resourcePatterns.seasonUpcomingFixtures,
    ],
    seasonId
  );

  res.setHeader(
    "Cache-Control",
    `s-maxage=${DEFAULT_CACHE_TIME}, stale-while-revalidate`
  );
  res
    .status(200)
    .json({ competition, standings, recentFixtures, upcomingFixtures });
};
