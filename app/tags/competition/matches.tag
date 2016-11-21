<competition-matches>
  <div class="matches__container column">
    <loading></loading>

    <div>
      <h2 class="sloppy hpadding">Past fixtures</h2>

      <div class="matches matches__list hpadding">
        <table class="matches-table">
          <tr each={ past_matches }>
            <td>{ date }</td>
            <td>{ host_name } - { away_name }</td>
            <td>
              <span if={ fixture }>{ time.substring(0, 5) }</span>
              <span if={ live }>(live)</span>
              <span if={ ended }>{ ft[0] } - { ft[1] }</span>
            </td>
          </tr>
        </table>
      </div>

      <h2 class="sloppy hpadding">Future fixtures</h2>

      <div class="matches matches__list hpadding">
        <table class="matches-table">
          <tr each={ future_matches }>
            <td>{ date }</td>
            <td>{ host_name } - { away_name }</td>
            <td>
              <span if={ fixture }>{ time.substring(0, 5) }</span>
              <span if={ live }>live</span>
              <span if={ ended }>{ ft[0] } - { ft[1] }</span>
            </td>
          </tr>
        </table>
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

    $standings-border-color: #ddd;

    .matches {
      table {
        margin: 10px 0;
        width: 100%;
        background: #f9f9f9;
      }

      tbody tr {
        border-bottom: 1px solid $standings-border-color;

        &:last-child {
          border-bottom: none;
        }
      }

      th,
      td {
        padding: 7px 4px;
      }
    }
  </style>
</competition-matches>
