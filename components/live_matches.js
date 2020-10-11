import Link from "next/link";
import Fixtures from "./Fixtures";
import { useResource, resourcePatterns } from "lib/hyena";
import groupFixturesByCompetitionId from "util/groupFixturesByCompetitionId";

// update interval in seconds
const UPDATE_INTERVAL = 15 * 1000;

export default function LiveMatches() {
  const liveMatches = useResource(resourcePatterns.liveMatches, 1, {
    refreshInterval: UPDATE_INTERVAL,
  });
  const groupedMatches = liveMatches
    ? groupFixturesByCompetitionId(liveMatches)
    : null;

  return (
    <div className="home__wrapper block wrapped">
      {groupedMatches?.map((item) => (
        <div key={item.competition.id}>
          <h2>
            <Link
              href={`/competition?id=${item.competition.id}`}
              as={`/c/${item.competition.id}`}
            >
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

      {groupedMatches?.length === 0 && (
        <span>No live matches at the moment.</span>
      )}
    </div>
  );
}
