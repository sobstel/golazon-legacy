<competition-standings-table>
  <table class="standings-table">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th class="team">Team</th>
        <th><acronym title="Matches Played">MP</acronym></th>
        <th><acronym title="Goals For / Goals Against">GF&#8209;GA</acronym></th>
        <th><acronym title="Points">Pts</acronym></th>
      </tr>
    </thead>
    <tbody>
      <tr each={ standings }>
        <td class="rank { zoneClass(zone) }"><span>{ rank }</span></td>
        <td class="team" title="{ team_name }">{ team_name }</td>
        <td>{ matches }</td>
        <td>{ goals_for }&nbsp;-&nbsp;{ goals_against }</td>
        <td class="pts">{ points }</td>
      </tr>
    </tbody>
  </table>

  <script type="coffee">
    this.zoneClass = (zone) =>
      return '' unless zone
      ('zone zone-' + zone)
  </script>

  <style type="scss">
    @import 'app/support.scss';

    $standings-border-color: #ddd;
    $blurred-text-color: #888;

    .standings {
      table {
        margin: 10px 0;
        width: 100%;
        background: #f9f9f9;
      }

      tbody tr {
        border-top: 1px solid $standings-border-color;
      }

      th,
      td {
        text-align: center;
        padding: 10px 7px;
      }

      th {
        text-align: center;
        color: $blurred-text-color;
        font-weight: normal;
      }

      .rank {
        color: $blurred-text-color;
      }
      .team {
        text-align: left;
        font-weight: 500;
      }
      .pts {
        font-weight: 700;
        min-width: 25px;
      }

      .zone {
        span {
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          border-radius: 12px;
          color: #fff;
        }

        &-1 span { background-color: #00796B; }
        &-2 span { background-color: #388E3C; }
        &-3 span { background-color: #689F38; }
        &-4 span { background-color: #AFB42B; }
        &-11 span { background-color: #FFA000; }
        &-12 span { background-color: #F57C00; }
        &-13 span { background-color: #E64A19; }
      }
    }
  </style>
</competition-standings-table>
