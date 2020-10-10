
const MAX_LENGTH = 25;
const STORAGE_KEY = 'golazon_search_history';

/**
 * @return array
 */
function fetchHistory() {
  const storageItem = localStorage.getItem(STORAGE_KEY);
  const history = storageItem ? JSON.parse(storageItem) : [];
  // HACK: backward compatibility when competition had "id" instead of "competition_id"
  return history.map(result => ({
    competition_id: result['competition_id'] || result['id'],
    name: result['name'],
    teamtype: result['teamtype'],
    area_name: result['area_name']
  }));
}

/**
 * @param history array
 */
function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/**
 * Add history item (and make sure it's unique)
 */
export function add(item) {
  let history = fetchHistory();

  // find duplicate
  const duplicateIndex = history.findIndex(historyItem => item['competition_id'] === historyItem['competition_id'] || item['competition_id'] === historyItem['id']);
  if (duplicateIndex !== -1) {
    history.splice(duplicateIndex, 1);
  }

  history.unshift(item);
  history = history.slice(0, MAX_LENGTH - 1);

  saveHistory(history);

  return history;
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
  const normalizedQuery = query.toLowerCase();
  return fetchHistory().filter((result) => {
    if (result.name.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    if (result['area_name'] && result['area_name'].toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    return false;
  });
}
