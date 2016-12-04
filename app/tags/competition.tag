<competition class="competition">

  <h1 class="competition__title">
    <loading></loading>
    { title }
  </h1>

  <div class="competition__container" if={ competition }>
    <competition-past-matches></competition-past-matches>
    <competition-future-matches></competition-future-matches>
    <competition-standings></competition-standings>
  </div>

  <script type="coffee">
    util = require 'util'

    @on 'mount', () =>
      @update()

      util.request @, '/competitions/' + opts.competition_id, (competition) =>
        @competition = competition
        @title = competition.name + ' ' + competition.season.name + ' (' + competition.area_name + ')'
        @title += ' ' + competition.teamtype if competition.teamtype != 'default'
        @update()

        util.title @title
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
