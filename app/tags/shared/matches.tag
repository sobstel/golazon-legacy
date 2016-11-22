<matches>
  <div class="matches__wrapper hpadding" if={ matches }>
    <table class="matches__container">
      <tbody>
        <tr each={ matches }>
          <td class="date">{ format_date(date, time) }</td>
          <td class="host">{ host_name }</td>
          <td class="status">
            <span if={ fixture }>{ format_time(date, time) }</span>
            <span if={ live }>live</span>
            <span if={ ended }>{ ft[0] } - { ft[1] }</span>
          </td>
          <td class="away">{ away_name }</td>
        </tr>
      </tbody>
    </table>
  </div>

  <script type="coffee">
    normalize_date = (date, time) ->
      new Date(date + ' ' + time + ' UTC')

    @format_date = (date, time) ->
      d = normalize_date(date, time)

      month = d.toLocaleString 'en-us', { month: "short" }
      day = ('0' + d.getDate()).slice(-2)

      "#{month} #{day}"

    @format_time = (date, time) ->
      d = normalize_date(date, time)

      hour = ('0' + d.getHours()).slice(-2)
      min = ('0' + d.getMinutes()).slice(-2)

      "#{hour}:#{min}"

    @on 'mount', () =>
      @matches = @opts.matches
      @update()
  </script>

  <style type="scss">
    @import 'app/support.scss';

    $table-border-color: #ddd;

    .matches {
      &__container {
        margin-bottom: 1em;
        width: 100%;
        background: #f9f9f9;

        tbody tr {
          border-top: 1px solid $table-border-color;

          &:first-child {
            border-top: none;
          }
        }

        td {
          padding: 6px 4px;
          white-space: nowrap;
          text-overflow: ellipsis;
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
        }
      }
    }
  </style>
</matches>
