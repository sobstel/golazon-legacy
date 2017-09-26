/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
//
// Search history
//
require.register('history', function(exports, require, module) {
  let history;
  const history_data = require('history_data');

  const max_history_length = 100;
  const max_score_count = 7; // it's purposely small to avoid items cached for too long

  const storage_key = 'search_history';

  const storageItem = localStorage.getItem(storage_key);
  if (storageItem) {
    history = JSON.parse(storageItem);
  } else {
    localStorage.clear();
    history = history_data.get_initial_history_list();
  }

  //
  // Sort history (by count, then last_visit)
  //
  const sort_history = function(history) {
    // JS sort is not stable, need to compare array keys when counts are equal
    let key;
    let asc, end;
    for (key = 0, end = history.length-1, asc = 0 <= end; asc ? key <= end : key >= end; asc ? key++ : key--) { history[key].key = key; }

    return history = history.sort(function(a, b) {
      let diff = b._score.count - a._score.count;
      if (diff === 0) { diff = b._score.last_visit - a._score.last_visit; }
      if (diff === 0) { diff = a.key - b.key; }
      return diff;
    });
  };

  //
  // Add new item to history
  //
  exports.update = function(item) {
    const history_item = history.find(history_item => (item.type === history_item.type) && (item.id === history_item.id));

    if (history_item) {
      if (!history_item._score) { history_item._score = { count: 0, last_visit: null }; }
      if (history_item._score.count < max_score_count) { history_item._score.count += 1; }
      history_item._score.last_visit = new Date();
    } else {
      item._score = { count: 1, last_visit: new Date() };
      item.active = false;
      history.unshift(item);
      if (history.length > max_history_length) { history.pop(); }
    }

    history = sort_history(history);
    return localStorage.setItem(storage_key, JSON.stringify(history));
  };

  //
  // Get by type, id
  //
  exports.get = (type, id) => history.find(item => (item.type === type) && (item.id === id));

  //
  // Get all history items (up to specified limit)
  //
  exports.getAll = function(limit) {
    const start = 0;
    const end = limit - 1;
    return history.slice(start, +end + 1 || undefined);
  };

  //
  // Search history
  //
  return exports.search = query =>
    history.filter(function(result) {
      if (result.name.toLowerCase().indexOf(query.toLowerCase()) === 0) { return true; }
      if (result.area_name.toLowerCase().indexOf(query.toLowerCase()) === 0) { return true; }
      return false;
    })
  ;
});
