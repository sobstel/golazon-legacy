<competition-standings>
  <div class="standings__container column">
    <div each={ this.rounds } class="standings">
      <h2 class="hpadding">{ name }</h2>

      <section if={ !groups }>
        <competition-standings-table></competition-standings-table>
      </section>

      <section each={ groups } if={ groups }>
        <h3 class="hpadding">{ name }</h3>
        <competition-standings-table if={ standings }></competition-standings-table>
      </section>
    </div>
  </div>

  <script type="coffee">
    util = require 'util'

    this.on 'mount', () =>
      season_id = this.parent.competition.season.season_id

      util.request '/season/' + season_id + '/standings', (rounds) =>
        this.rounds = rounds
        this.update()
  </script>

  <style type="scss">
    @import 'app/support.scss';
  </style>
</competition-standings>
