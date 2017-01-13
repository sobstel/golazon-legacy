require.register 'util', (exports, require, module) ->
  riot = require 'riot'

  api_url = 'http://toller.xyz'

  #
  # Site title
  #
  exports.title = (title) ->
    document.title = title + ' - Golazon'

  #
  # Returns request object
  #
  exports.request = (that, path, func) ->
    that.loading = true
    that.update()

    # TODO: timeout

    fetch api_url + path
      .then (response) ->
        response.json()
      .then (data) ->
        that.loading = false
        that.update()
        func data
      .catch (err) ->
        that.loading = false
        that.error = err.message
        that.update()

  exports.delay = (seconds, func) ->
    setTimeout func, seconds * 1000

  exports.terminate_delay = (id) ->
    clearTimeout id

  #
  # Event bus
  #
  exports.beholder = riot.observable()

  #
  # Normalize date to UTC before converting
  #
  normalize_date = (date, time) ->
    y = date[0..3]
    m = date[5..6] - 1
    d = date[8..9]
    hr = time[0..1]
    mn = time[3..4]

    new Date(Date.UTC(y, m, d, hr, mn, 0))

  #
  # Format date
  #
  exports.format_date = (date, time) ->
    d = normalize_date(date, time)
    today = new Date()

    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    month = months[d.getMonth()]
    day = ('0' + d.getDate()).slice(-2)

    return 'Today' if d.toDateString() == today.toDateString()

    "#{month} #{day}"

  #
  # Format time
  #
  exports.format_time = (date, time) ->
    d = normalize_date(date, time)

    hour = ('0' + d.getHours()).slice(-2)
    min = ('0' + d.getMinutes()).slice(-2)

    "#{hour}:#{min}"
