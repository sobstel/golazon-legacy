import queryCompetition from "common/util/queryCompetition";
import competitions from "data/competitions.json";

const MAX_RESULTS = 20;
const TOTAL_COUNT = competitions.length;

export default async function getCompetitions(q?: string) {
  if (!q) {
    return [];
  }

  const results = [];
  let resultsSize = 0;
  let i = 0;

  while (i < TOTAL_COUNT && resultsSize < MAX_RESULTS) {
    if (queryCompetition(String(q), competitions[i])) {
      results.push(competitions[i]);
      resultsSize += 1;
    }
    i += 1;
  }

  return results;
}
