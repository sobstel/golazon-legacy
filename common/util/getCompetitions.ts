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
    if (matchesQuery(String(q), competitions[i])) {
      results.push(competitions[i]);
      resultsSize += 1;
    }
    i += 1;
  }

  return results;
}

function matchesQuery(
  query: string,
  item: { name: string; area_name?: string }
): boolean {
  const searchValue = query.toLowerCase();

  if (item["name"].toLowerCase().includes(searchValue)) {
    return true;
  }

  if (
    item["area_name"] &&
    item["area_name"].toLowerCase().includes(searchValue)
  ) {
    return true;
  }

  return false;
}
