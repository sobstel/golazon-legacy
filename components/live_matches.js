import Link from "next/link";
import Fixtures from "components/Fixtures";
import { useResource, resourcePatterns } from "common/hyena";
import groupFixturesByCompetitionId from "common/util/groupFixturesByCompetitionId";

export default function LiveMatches() {
  const { data: liveMatches, loading } = useResource(
    () => resourcePatterns.liveMatches
  );

  if (loading) {
    return (
      <div className="block wrapped">
        <p className="loader">Loading</p>
      </div>
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
