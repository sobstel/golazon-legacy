import { herd, hyena } from "lib/hyena";

// TODO: type: return type
export default async function getCompetition(id: string) {
  const [competition] = await herd([hyena(`competitions/${id}`)]);
  const seasonId = competition.season["season_id"];

  const [standings, recentFixtures, upcomingFixtures] = await herd([
    hyena(`seasons/${seasonId}/standings`),
    hyena(`seasons/${seasonId}/matches/past`),
    hyena(`seasons/${seasonId}/matches/future`),
  ]);

  return { competition, standings, recentFixtures, upcomingFixtures };
}
