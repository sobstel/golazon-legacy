import Link from "next/link";
import Fixtures from "components/Fixtures";
import { useResource, resourcePatterns } from "util/hyena";
import groupFixturesByCompetitionId from "util/groupFixturesByCompetitionId";

// update interval in seconds
const UPDATE_INTERVAL = 15 * 1000;

export default function LiveMatches() {
  const { data: liveMatches, loading } = useResource(
    resourcePatterns.liveMatches,
    -1,
    {
      revalidateOnMount: true,
      refreshInterval: UPDATE_INTERVAL,
    }
  );

  if (loading) {
    // TODO: replace with skeleton
    return (
      <p className="block wrapped">
        <span className="loader">Loading</span>
      </p>
    );
  }

  const groupedMatches = liveMatches?.length
    ? groupFixturesByCompetitionId(liveMatches)
    : [];

  return (
    <div className="home__wrapper block wrapped">
      {groupedMatches.map((item) => (
        <div key={item.competition.id}>
          <h2>
            <Link href={`/c/${item.competition.id}`}>
              <a>
                {item.competition.name}
                {item.competition.area_name &&
                  ` (${item.competition.area_name}) `}
                {item.teamtype}
              </a>
            </Link>
          </h2>
          <Fixtures fixtures={item.matches} />
        </div>
      ))}

      {groupedMatches.length === 0 && (
        <span>No live matches at the moment.</span>
      )}
    </div>
  );
}
