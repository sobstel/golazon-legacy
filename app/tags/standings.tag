<standings>
  <div each={ this.rounds }>
    <h3>{ name }</h3>

    <section if={ !groups }>
      <standings-table></standings-table>
    </section>

    <section each={ groups } if={ groups }>
      <h4>{ name }</h4>
      <standings-table if={ standings }></standings-table>
    </section>
  </div>

  <script type="coffee">
    util = require 'util'

    this.on 'mount', () =>
      util.request '/season/' + opts.season_id + '/standings', (rounds) =>
        this.rounds = rounds
        this.update()
  </script>
</standings>
