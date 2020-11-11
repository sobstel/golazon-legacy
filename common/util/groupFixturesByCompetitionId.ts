import * as History from "common/history";

// TODO: move under LiveMatches feature
// TODO: type
export default function groupFixturesByCompetitionId(fixtures: any[]) {
  const reversedHistoryResults = History.all().reverse();

  const competitionMatches = fixtures.reduce((result, match) => {
    const key = match["competition_id"];

    if (!result[key]) {
      return {
        ...result,
        [key]: {
          competition: {
            id: match["competition_id"],
            name: match["competition_name"],
            area_name: match["area_name"],
          },
          matches: [match],
          _score: reversedHistoryResults.findIndex((result) => {
            return result["id"] === match["competition_id"];
          }),
        },
      };
    }

    result[key].matches.push(match);
    return result;
  }, {});

  const groupedMatches = Object.keys(competitionMatches).map(
    (key) => competitionMatches[key]
  );

  // sort by history search result position
  groupedMatches.sort((a, b) => b["_score"] - a["_score"]);

  return groupedMatches;
}
