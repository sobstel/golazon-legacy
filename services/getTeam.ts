import { herd, hyena } from 'lib/hyena';

export default async function getTeam(id: string) {
  const [info] = await herd([hyena(`teams/${id}`)]);
  // TODO: add prevMatches, nextMatches, competitions
  return { ...info };
}
