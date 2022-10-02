import queryCompetition from "common/util/queryCompetition";
import uniqBy from "common/util/uniqBy";

const MAX_LENGTH = 100;
const STORAGE_KEY = "golazon_search_history";

function normalizeHistory(history) {
  let normalizedHistory = history.map((result) => ({
    // HACK: backward compatibility when competition had "id" instead of "competition_id"
    competition_id: result["competition_id"] || result["id"],
    name: result["name"],
    teamtype: result["teamtype"],
    area_name: result["area_name"],
  }));
  normalizedHistory = uniqBy(normalizedHistory, "competition_id");
  return normalizedHistory;
}

/**
 * @return array
 */
function fetchHistory() {
  const storageItem = localStorage.getItem(STORAGE_KEY);
  const history = storageItem ? JSON.parse(storageItem) : [];
  return normalizeHistory(history);
}

/**
 * @param history array
 */
function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeHistory(history)));
}

/**
 * Add history item (and make sure it's unique)
 */
export function add(item) {
  const history = fetchHistory();

  // remove duplicates
  let nextHistory = history.filter(
    (historyItem) => item["competition_id"] !== historyItem["competition_id"]
  );
  nextHistory.unshift(item);
  nextHistory = nextHistory.slice(0, MAX_LENGTH - 1);

  saveHistory(nextHistory);

  return nextHistory;
}

/**
 * Get all history items (up to specified limit)
 */
export function all() {
  return fetchHistory();
}

/**
 * Search history
 */
export function search(query) {
  return fetchHistory().filter((result) => queryCompetition(query, result));
}
