<competition class="competition">
  <h1 class="competition__title hpadding">{ this.full_name }</h1>

  <div class="competition__container">
    <!-- <competition-matches></competition-matches> -->
    <competition-standings if={ competition }></competition-standings>
  </div>

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
    @import 'app/support.scss';

    .competition {
      &__container {
        overflow: auto;
      }
    }
  </style>
</competition>
