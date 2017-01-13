
# need this in global namespace due to tags registers
# exports = this; exports.riot = require 'riot'
riot = require 'riot'

loadScript = (src) ->
  js = document.createElement('script')
  js.src = src
  document.head.appendChild(js)

loadScript('/fetch.js') unless self.fetch
loadScript('/array.find.js') unless Array.prototype.find
