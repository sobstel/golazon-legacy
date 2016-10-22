<competition>
  <h2>{this.competition.area_name} / { this.competition.name } / { this.competition.season.name }</h2>

  <!-- <competition-matches></competition-matches> -->
  <competition-standings if={ competition }></competition-standings>

  <script type="coffee">
    util = require 'util'

    this.on 'mount', () =>
      util.request '/competition/' + opts.competition_id, (competition) =>
        this.competition = competition
        this.update()
  </script>
</competition>
