<competition class="competition">
  <h1 class="competition__title">{ this.full_name }</h1>

  <!-- <competition-matches></competition-matches> -->
  <competition-standings if={ competition }></competition-standings>

  <script type="coffee">
    util = require 'util'

    this.on 'mount', () =>
      util.request '/competition/' + opts.competition_id, (competition) =>
        this.competition = competition
        this.full_name = competition.name + ' ' + competition.season.name + ' (' + competition.area_name + ')'
        this.update()

        util.title this.full_name
  </script>

  <style type="scss">
    .competition__title {
      padding: 0 10px;
    }
  </style>
</competition>
