export default function mergeFixtures(recentFixtures, upcomingFixtures, n) {
  return (recentFixtures || [])
    .slice(recentFixtures?.length ? -n : 0)
    .concat(upcomingFixtures?.slice(0, n) || []);
}
