<competition>
  <h2>{ this.full_name }</h2>

  <!-- <competition-matches></competition-matches> -->
  <competition-standings if={ competition }></competition-standings>

  <script type="coffee">
    util = require 'util'

    this.on 'mount', () =>
      util.request '/competition/' + opts.competition_id, (competition) =>
        this.competition = competition
        this.full_name = competition.name + ' ' + competition.season.name + ' - ' + competition.area_name
        this.update()

        util.title this.full_name
  </script>
</competition>
