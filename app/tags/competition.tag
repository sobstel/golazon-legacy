<competition class="competition">
  <loading></loading>
  <h1 class="competition__title sloppy hpadding">{ full_name }</h1>

  <div class="competition__container">
    <competition-matches if={ competition }></competition-matches>
    <competition-standings if={ competition }></competition-standings>
  </div>

  <script type="coffee">
    util = require 'util'

    @on 'mount', () =>
      @update()

      util.request @, '/competition/' + opts.competition_id, (competition) =>
        @competition = competition
        @full_name = competition.name + ' ' + competition.season.name + ' (' + competition.area_name + ')'
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
