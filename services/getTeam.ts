import { herd, hyena } from "lib/hyena";

// TODO: type: return type
export default async function getTeam(id: string) {
  const [baseInfo, competitions, prevMatches, nextMatches] = await herd([
    hyena(`teams/${id}`),
    hyena(`teams/${id}/competitions`),
    hyena(`teams/${id}/matches/past/50`),
    hyena(`teams/${id}/matches/future/50`),
  ]);
  const fixtures = prevMatches.concat(nextMatches);

  return { ...baseInfo, competitions, fixtures };
}
