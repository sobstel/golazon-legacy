<competition-matches>
  <div class="matches__container column">
    <loading></loading>

    <div each={ rounds }>
      <h2 class="sloppy hpadding">{ name }</h2>

      <div class="matches__list hpadding">
        <div each={ matches }>
          { date }:
          { host_name } - { away_name }
          <span if={ status == 'fixture' }>({ time })</span>
          <span if={ status == 'playing' }>(live)</span>
          <span if={ status == 'played' }>{ ft[0] } - { ft[1] }</span>
        </div>
      </div>
    </div>
  </div>

  <script type="coffee">
    util = require 'util'

    @on 'mount', () =>
      season_id = @parent.competition.season.season_id

      util.request @, '/season/' + season_id + '/matches/past/?limit=40', (rounds) =>
        @rounds = rounds
        @update()
  </script>

  <style type="scss">
    @import 'app/support.scss';
  </style>
</competition-matches>
