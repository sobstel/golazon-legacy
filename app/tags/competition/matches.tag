<competition-matches>
  <div class="{ type }-matches block wrapped" if={ matches.length > 0 }>
    <virtual if={ past_type }>
      <loading />
      <p class="matches nav" if={ show_more_nav }>
        <a href="" onclick={ on_more }>more</a>
      </p>
    </virtual>

    <matches matches={ matches } />

    <virtual if={ future_type }>
      <p class="matches nav" if={ show_more_nav }>
        <a href="" onclick={ on_more }>more</a>
      </p>
      <loading />
    </virtual>
  </div>

  <script type="coffee">
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
  </script>

  <style type="scss">
    @import 'app/support.scss';

    .past-matches .nav {
      text-align: center;
      margin-top: 0.5em;
    }

    .future-matches .nav {
      text-align: center;
      margin-bottom: 0.5em;
    }
  </style>
</competition-matches>
