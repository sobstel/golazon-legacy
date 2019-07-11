
const MAX_LENGTH = 25;
const STORAGE_KEY = 'golazon_search_history';

/**
 * @return array
 */
function fetchHistory() {
  const storageItem = localStorage.getItem(STORAGE_KEY);
  return storageItem ? JSON.parse(storageItem) : [];
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
  const duplicateIndex = history.findIndex(historyItem => (
    item.type === historyItem.type && item.id === historyItem.id
  ));
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
 * Get by type, id
 */
export function find(type, id) {
  return fetchHistory().find(item => item.type === type && item.id === id);
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
