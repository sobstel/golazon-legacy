<matches>
  <div class="matches__wrapper" if={ matches }>
    <table class="matches__container">
      <tbody>
        <tr each={ matches } onclick={ go_to_match }>
          <td class="min" if={ min && period != 'HT' }>{ min }'</td>
          <td class="period" if={ period == 'HT' }>{ period }</td>
          <td class="date" if={ !min && period != 'HT' }>{ format_date(date, time) }</td>
          <td class="host">{ home_name }</td>
          <td class="status"><score match={ this }></score></td>
          <td class="away">{ away_name }</td>
        </tr>
      </tbody>
    </table>
  </div>

  <script type="coffee">
    util = require 'util'

    @format_date = util.format_date
    @format_time = util.format_time
    @format_score = util.format_score

    @go_to_match = (e) ->
      riot.route '/m/' + e.item.match_id

    @on 'mount', () =>
      @matches = @opts.matches
      @update()

    @on 'updated', () =>
      @matches = @opts.matches
      @update()
   </script>

  <style type="scss">
    @import 'app/support.scss';

    $table-border-color: #ddd;

    .matches {
      &__container {
        width: 100%;
        table-layout: fixed;

        tbody tr {
          cursor: pointer;
          border-top: 1px solid $table-border-color;

          &:first-child {
            border-top: none;
          }

          &:hover {
            background: $hover-color;
          }
        }

        td {
          padding: 8px 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: clip;
        }

        .min,
        .period,
        .date {
          font-weight: 600;
          width: 60px;
        }

        .date {
          font-weight: 600;
        }

        .host {
          text-align: right;
        }

        .status {
          text-align: center;
          font-weight: 600;
          width: 60px;
          white-space: normal;
        }
      }
    }
  </style>
</matches>
