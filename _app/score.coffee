    util = require 'util'

    @format_time = util.format_time
    @format_score = util.format_score

    @on 'mount', () =>
      @match = @opts.match
      @update()
