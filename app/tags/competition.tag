<competition class="competition">
  <p class="loading sloppy hpadding" if={ loading }>loading competition info</p>
  <h1 class="competition__title sloppy hpadding">{ full_name }</h1>

  <div class="competition__container">
    <!-- <competition-matches></competition-matches> -->
    <competition-standings if={ competition }></competition-standings>
  </div>

  <script type="coffee">
    util = require 'util'

    @on 'mount', () =>
      @loading = true
      @update()

      util.request '/competition/' + opts.competition_id, (competition) =>
        @competition = competition
        @full_name = competition.name + ' ' + competition.season.name + ' (' + competition.area_name + ')'
        @loading = false
        @update()
        util.title @full_name
  </script>

  <style type="scss">
    @import 'app/support.scss';

    .competition {
      &__container {
        overflow: auto;
        font-size: 13px;
      }
    }
  </style>
</competition>
