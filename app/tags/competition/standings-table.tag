<competition-standings-table>
  <table class="standings-table">
    <thead>
      <tr>
        <th class="standings-table__cell">&nbsp;</th>
        <th class="standings-table__cell standings-table__cell--team">Team</th>
        <th class="standings-table__cell"><acronym title="Matches Played">MP</acronym></th>
        <th class="standings-table__cell"><acronym title="Goals For / Goals Against">GF&#8209;GA</acronym></th>
        <th class="standings-table__cell"><acronym title="Points">Pts</acronym></th>
      </tr>
    </thead>
    <tbody>
      <tr each={ standings } class="standings-table__row">
        <td class="standings-table__cell standings-table__cell--rank" data-zone="{ zone }"><span>{ rank }</span></td>
        <td class="standings-table__cell standings-table__cell--team" title="{ team_name }">{ team_name }</td>
        <td class="standings-table__cell ">{ matches }</td>
        <td class="standings-table__cell standings-table__cell--centered">{ goals_for }&nbsp;-&nbsp;{ goals_against }</td>
        <td class="standings-table__cell standings-table__cell--important">{ points }</td>
      </tr>
    </tbody>
  </table>

  <script type="coffee">
  </script>

  <style type="scss">
    @import 'app/support.scss';

    .standings-table {
      margin: 10px 0;
      width: 100%;

      background: #f9f9f9;

      &__row {
        border-top: 1px solid #ddd;
      }

      thead {
        &__cell {
          text-align: center;
          padding: 7px 5px;
          color: #888;
          font-weight: normal;

          &--team {
            text-align: left;
          }
        }
      }

      &__cell {
        text-align: center;
        padding: 10px 7px;

        &--team {
          font-weight: 500;
          text-align: left;
        }
        &--centered {
          text-align: center;
        }
        &--rank {
          color: #888;
        }
        &--important {
          font-weight: 600;
          min-width: 25px;
        }
      }

      [data-zone] {
          padding: 7px 7px;
      }

      [data-zone] span {
          display: block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          border-radius: 14px;
          color: #fff;
      }

      [data-zone='1'] span { background-color: #00796B; }
      [data-zone='2'] span { background-color: #388E3C; }
      [data-zone='3'] span { background-color: #689F38; }
      [data-zone='4'] span { background-color: #AFB42B; }
      [data-zone='11'] span { background-color: #FFA000; }
      [data-zone='12'] span { background-color: #F57C00; }
      [data-zone='13'] span { background-color: #E64A19; }


    }
  </style>
</competition-standings-table>
