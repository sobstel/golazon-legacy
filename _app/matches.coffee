    util = require 'util'

    @type = opts.type
    @past_type = (@type == 'past')
    @future_type = (@type == 'future')

    @show_more_nav = true
    @update()

    limit = 10

    @on 'mount', () =>
      load_matches()

    @on_more = (e) =>
      limit += 10
      if limit >= 50
        limit = 50
        @show_more_nav = false
        @update

      load_matches()

    load_matches = () =>
      season_id = @parent.competition.season.season_id

      util.request @, "/season/#{season_id}/matches/#{@type}/#{limit}", (matches) =>
        @matches = matches
        @show_more_nav = false if matches < limit
        @update()
