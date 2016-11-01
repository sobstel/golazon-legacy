require.register 'util', (exports, require, module) ->
  api_url = 'http://toller.xyz'
  request = require 'superagent'

  exports.title = (title) ->
    document.title = title + ' - Golazon'
    document.title = 'Golazon' if title == 'Golazon'

  exports.request = (path, func) ->
    request
       .get api_url + path
       .end (err, res) =>
          # TODO: proper error handling
          console.log err.message if err
          func res.body

  exports.delay = (seconds, func) ->
    setTimeout func, seconds * 1000

  exports.clear_delay = (id) ->
    clearTimeout id
