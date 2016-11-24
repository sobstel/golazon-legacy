<competition class="competition">
  <loading></loading>
  <h1 class="competition__title sloppy hpadding">{ full_name }</h1>

  <div class="competition__container" if={ competition }>
    <div class="column">
      <h2 class="sloppy hpadding">Matches</h2>
      <competition-past-matches></competition-past-matches>
      <competition-future-matches></competition-future-matches>
    </div>
    <div class="column">
      <competition-standings></competition-standings>
    </div>
  </div>

  <script type="coffee">
    util = require 'util'

    @on 'mount', () =>
      @update()

      util.request @, '/competitions/' + opts.competition_id, (competition) =>
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
