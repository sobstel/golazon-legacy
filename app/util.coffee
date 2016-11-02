require.register 'util', (exports, require, module) ->
  api_url = 'http://toller.xyz'
  request = require 'superagent'

  exports.title = (title) ->
    document.title = title + ' - Golazon'
    document.title = 'Golazon' if title == 'Golazon'

  #
  # Returns request object
  #
  exports.request = (_this, path, func) ->
    _this.loading = true
    _this.update()

    request
       .get api_url + path
       .timeout 5000
       .end (err, res) ->
         _this.loading = false
         _this.update()

         if err
          _this.error = err.message
          _this.update()
         else
          func res.body

  exports.delay = (seconds, func) ->
    setTimeout func, seconds * 1000

  exports.clear_delay = (id) ->
    clearTimeout id
