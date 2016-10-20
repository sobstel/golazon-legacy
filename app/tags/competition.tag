<competition>
  <p>{this.competition.area_name} / { this.competition.name } / { this.competition.season.name }</p>

  <div id="standings"></div>

  <script type="coffee">
    util = require 'util'

    this.on 'mount', () =>
      util.request '/competition/' + opts.competition_id, (competition) =>
        this.competition = competition
        this.update()

        riot.mount '#standings', 'standings', season_id: this.competition.season.season_id
  </script>
</competition>
