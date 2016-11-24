#
# Search history
#
require.register 'history', (exports, require, module) ->
  history_data = require 'history_data'

  max_history_length = 100
  max_score_count = 7 # it's purposely small to avoid items cached for too long

  storage_key = 'search_history'

  storageItem = localStorage.getItem(storage_key)
  if storageItem
    history = JSON.parse(storageItem)
  else
    localStorage.clear()
    history = history_data.get_initial_history_list()

  #
  # Sort history (by count, then last_visit)
  #
  sort_history = (history) ->
    # JS sort is not stable, need to compare array keys when counts are equal
    history[key].key = key for key in [0..history.length-1]

    history = history.sort (a, b) ->
      diff = b._score.count - a._score.count
      diff = b._score.last_visit - a._score.last_visit if diff == 0
      diff = a.key - b.key if diff == 0
      return diff

  #
  # Add new item to history
  #
  exports.update = (item) ->
    history_item = history.find (history_item) -> item.type == history_item.type && item.id == history_item.id

    if history_item
      history_item._score ||= { count: 0, last_visit: null }
      history_item._score.count += 1 if history_item._score.count < max_score_count
      history_item._score.last_visit = new Date()
    else
      item._score = { count: 1, last_visit: new Date() }
      item.active = false
      history.unshift item
      history.pop() if history.length > max_history_length

    history = sort_history(history)
    localStorage.setItem(storage_key, JSON.stringify(history))

  #
  # Get all history items (up to specified limit)
  #
  exports.getAll = (limit) ->
    start = 0
    end = limit - 1
    history[start..end]

  #
  # Search history
  #
  exports.search = (query) ->
    history.filter (result) ->
      return true if result.name.toLowerCase().indexOf(query.toLowerCase()) == 0
      return true if result.area_name.toLowerCase().indexOf(query.toLowerCase()) == 0
      false
