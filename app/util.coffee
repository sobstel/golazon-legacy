require.register 'util', (exports, require, module) ->
  api_url = 'http://toller.xyz'
  request = require 'superagent'

  exports.request = (path, callback) ->
    request
       .get api_url + path
       .end (err, res) =>
          # TODO: proper error handling
          console.log err.message if err
          callback res.body
