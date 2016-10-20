<standings>
  <div each={ this.rounds }>
    <h2>{ name }</h2>

    <standings-table if={ standings }></standings-table>

    <div each={ groups } if={ groups }>
      <h3>{ name }</h3>
      <standings-table if={ standings }></standings-table>
    </div>
  </div>

  <script type="coffee">
    util = require 'util'

    this.on 'mount', () =>
      util.request '/season/' + opts.season_id + '/standings', (rounds) =>
        this.rounds = rounds
        this.update()
  </script>
</standings>
