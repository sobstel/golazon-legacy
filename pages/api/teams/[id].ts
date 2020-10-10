import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_CACHE_TIME } from "lib/config";
import { fetchResources, resourcePatterns } from "lib/hyena";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const [
    team,
    competitions,
    recentFixtures,
    upcomingFixtures,
  ] = await fetchResources(
    [
      resourcePatterns.team,
      resourcePatterns.teamCompetitions,
      resourcePatterns.teamRecentFixtures,
      resourcePatterns.teamUpcomingFixtures,
    ],
    id as string
  );

  res.setHeader(
    "Cache-Control",
    `s-maxage=${DEFAULT_CACHE_TIME}, stale-while-revalidate`
  );

  res
    .status(200)
    .json({ team, competitions, recentFixtures, upcomingFixtures });
};
