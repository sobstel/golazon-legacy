    util = require 'util'

    @on 'mount', () =>
      season_id = @parent.competition.season.season_id

      util.request @, '/season/' + season_id + '/standings', (rounds) =>
        @rounds = rounds
        @update()

    @zone_class = (zone) =>
      return '' unless zone
      ('zone zone-' + zone)
