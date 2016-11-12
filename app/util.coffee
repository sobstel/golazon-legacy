require.register 'util', (exports, require, module) ->
  request = require 'superagent'
  riot = require 'riot'

  api_url = 'http://toller.xyz'

  #
  # Site title
  #
  exports.title = (title) ->
    document.title = title + ' - Golazon'
    document.title = 'Golazon' if title == 'Golazon'

  #
  # Returns request object
  #
  exports.request = (that, path, func) ->
    that.loading = true
    that.update()

    request
       .get api_url + path
       .timeout 7000
       .end (err, res) ->
         that.loading = false
         that.update()

         if err
          that.error = err.message
          that.update()
         else
          func res.body

  exports.delay = (seconds, func) ->
    setTimeout func, seconds * 1000

  exports.terminate_delay = (id) ->
    clearTimeout id

  #
  # Event bus
  #
  exports.beholder = riot.observable()
