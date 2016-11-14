#
# Search history
#
require.register 'history', (exports, require, module) ->
  history_data = require 'history_data'

  max_history_length = 100
  history_version = 1
  storage_key = 'history_v' + history_version

  storageItem = localStorage.getItem(storage_key)
  if storageItem
    history = JSON.parse(storageItem)
  else
    history = history_data.get_initial_history_list()
    # clean previous history index
    localStorage.removeItem 'history_v' + (history_version - 1)

  #
  # Sort history (by number of addings)
  #
  sort_history = (history) ->
    # JS sort is not stable, need to compare keys when counts are equal
    history[key].key = key for key in [0..history.length-1]

    history = history.sort (a, b) ->
      diff = b.count - a.count
      diff = a.key - b.key if diff == 0
      return diff

  #
  # Add new item to history
  #
  exports.update = (item) ->
    history_item = history.find (history_item) -> item.type == history_item.type && item.id == history_item.id

    if history_item
      history_item.count ||= 0
      history_item.count += 1
    else
      item.count = 1
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
