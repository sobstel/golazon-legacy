import { herd, hyena } from "lib/hyena";

// TODO: type: return type
export default async function getTeam(id: string) {
  const [team, competitions, recentFixtures, upcomingFixtures] = await herd([
    hyena(`teams/${id}`),
    hyena(`teams/${id}/competitions`),
    hyena(`teams/${id}/matches/past`),
    hyena(`teams/${id}/matches/future`),
  ]);
  return { team, competitions, recentFixtures, upcomingFixtures };
}
