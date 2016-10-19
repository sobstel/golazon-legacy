<competition>
  <p>{this.competition.area_name} / { this.competition.name } / { this.competition.season.name }</p>

  <script type="coffee">
    util = require 'util'

    this.on 'mount', () =>
      util.request '/competition/' + opts.competition_id, (competition) =>
        this.competition = competition
        this.update()
  </script>
</competition>
