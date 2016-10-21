<competition-standings>
  <div each={ this.rounds }>
    <h3>{ name }</h3>

    <section if={ !groups }>
      <competition-standings-table></competition-standings-table>
    </section>

    <section each={ groups } if={ groups }>
      <h4>{ name }</h4>
      <competition-standings-table if={ standings }></competition-standings-table>
    </section>
  </div>

  <script type="coffee">
    util = require 'util'

    this.on 'mount', () =>
      season_id = this.parent.competition.season.season_id

      util.request '/season/' + season_id + '/standings', (rounds) =>
        this.rounds = rounds
        this.update()
  </script>
</competition-standings>
