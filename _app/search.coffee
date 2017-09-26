util = require 'util'
history = require 'history'

active_result_index = -1
delay = null
@results = []
@clear_button_visible = false
@hint = null

active_result = (index) =>
  index = 0 if index >= @results.length
  index = Math.max(@results.length - 1, 0) if index < 0

  result.active = false for result in @results

  @results[index].active = true
  active_result_index = index

  @update()

reset_search_results = () =>
  active_result_index = -1
  @results = []
  @loading = false
  @clear_button_visible = false
  @update()

exit_search = () =>
  reset_search_results()
  @hint = false
  @update()

@search = (e) =>
  text = e.target.value

  @hint = false
  @clear_button_visible = true

  if e.keyCode == 40 && @results.length > 0 # down arrow
    active_result(active_result_index + 1)

  else if e.keyCode == 38 && @results.length > 0 # up arrow
    active_result(active_result_index - 1)

  else if e.keyCode == 27 # esc
    @search_clear_click()

  else if e.keyCode == 13 # enter
    # SMELL: hardcoded url to competition
    riot.route '/c/' + @results[active_result_index].id if active_result_index >= 0
    exit_search()

  else
    util.terminate_delay(delay) if delay

    @results_hint = false

    if text.length == 0
      @loading = false
      @results = history.getAll(10)
      active_result(0)
      @update()
      return

    @results = history.search(text)

    if text.length < 4
      @results_hint = 'type 4 letters or more to search full database...'
      @update()
      return

    # show before delay
    @loading = true
    @update()

    delay = util.delay 0.25, =>
      util.request @, '/search?q=' + text, (results) =>
        # filter out results found in search history
        @results = @results.concat results.filter (result) =>
          @results.filter((r) -> (r.type == result.type && r.id == result.id)).length == 0
        @hint = 'no results found' if @results.length == 0
        @update()

@search_result_mouseover = (e) =>
  active_result((result.id for result in @results).indexOf(e.item.id))

@search_result_click = (e) =>
  history.update @results[active_result_index] if active_result_index >= 0
  exit_search()
  true

@search_clear_click = (e) =>
  @q.value = ''
  @update()
  exit_search()

@go_home = (e) =>
  reset_search_results()
  riot.route '/'
