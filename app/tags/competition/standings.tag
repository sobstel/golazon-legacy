<competition-standings>
  <div class="standings__wrap">
    <div each={ this.rounds }>
      <h2>{ name }</h2>

      <section if={ !groups }>
        <competition-standings-table></competition-standings-table>
      </section>

      <section each={ groups } if={ groups }>
        <h3>{ name }</h3>
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

    .standings__wrap {
      @include column();

      h2 {
        padding: 0 10px;
      }
    }
  </style>
</competition-standings>
