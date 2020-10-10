import { herd, hyena } from "lib/hyena";

// TODO: type: return type
export default async function getTeam(id: string) {
  const [match] = await herd([hyena(`matches/${id}`)]);
  return { match };
}
