<competition-past-matches>
  <div class="block wrapped" if={ matches.length > 0 }>
    <loading></loading>
    <matches matches={ matches }></matches>
  </div>

  <script type="coffee">
    util = require 'util'

    @on 'mount', () =>
      season_id = @parent.competition.season.season_id

      util.request @, '/season/' + season_id + '/matches/past/10', (matches) =>
        @matches = matches
        @update()
  </script>

  <style type="scss">
    @import 'app/support.scss';

  </style>
</competition-past-matches>
