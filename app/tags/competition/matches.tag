<competition-matches>
  <div class="matches__container column">
    <loading></loading>

    <div>
      <h2 class="sloppy hpadding">Future fixtures</h2>

      <div class="matches__list hpadding">
        <div each={ future_matches }>
          { date }:
          { host_name } - { away_name }
          ({ time.substring(0, 5) })
          <span if={ status == 'playing' }>(live)</span>
          <span if={ status == 'played' }>{ ft[0] } - { ft[1] }</span>
        </div>
      </div>

      <h2 class="sloppy hpadding">Past fixtures</h2>

      <div class="matches__list hpadding">
        <div each={ past_matches }>
          { date }:
          { host_name } - { away_name }
          <span if={ status == 'fixture' }>(live)</span>
          <span if={ status == 'played' }>{ ft[0] } - { ft[1] }</span>
        </div>
      </div>
    </div>
  </div>

  <script type="coffee">
    util = require 'util'

    @on 'mount', () =>
      season_id = @parent.competition.season.season_id

      util.request @, '/season/' + season_id + '/matches/past/10', (matches) =>
        @past_matches = matches
        @update()

      util.request @, '/season/' + season_id + '/matches/future/10', (matches) =>
        @future_matches = matches
        @update()
  </script>

  <style type="scss">
    @import 'app/support.scss';
  </style>
</competition-matches>
