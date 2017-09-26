    util = require 'util'

    @format_date = util.format_date
    @format_time = util.format_time

    timeout = null

    refresh_data = () =>
      util.request @, '/matches/' + opts.match_id, (match) =>
        @match = match

        @title = match.home_name + ' v ' + match.away_name + ' - ' + match.competition_name + ' - ' + match.area_name

        @update()

        util.title @title

        timeout = setTimeout(refresh_data, 30 * 1000) if match.live

    @on 'mount', () =>
      refresh_data()

    @on 'unmount', () =>
      clearTimeout(timeout) if timeout
