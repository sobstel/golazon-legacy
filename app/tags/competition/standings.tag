<competition-standings>
  <div class="standings__container column">
    <loading></loading>

    <div each={ rounds } class="standings">
      <h2 class="sloppy hpadding">{ name }</h2>

      <section if={ !groups }>
        <competition-standings-table></competition-standings-table>
      </section>

      <section each={ groups } if={ groups }>
        <h3 class="sloppy hpadding">{ name }</h3>
        <competition-standings-table if={ standings }></competition-standings-table>
      </section>
    </div>
  </div>

  <script type="coffee">
    util = require 'util'

    @on 'mount', () =>
      season_id = @parent.competition.season.season_id

      util.request @, '/season/' + season_id + '/standings', (rounds) =>
        @rounds = rounds
        @update()
  </script>

  <style type="scss">
    @import 'app/support.scss';
  </style>
</competition-standings>
