<competition-standings-table>
  <table>
    <tr each={ standings }>
      <td>{ rank }</td>
      <td class="cell--non-numeric">{ team_name }</td>
      <td>{ matches }</td>
      <td>{ won }</td>
      <td>{ draw }</td>
      <td>{ lost }</td>
      <td>{ goals_for } - { goals_against }</td>
      <td><strong>{ points }<strong></td>
    </tr>
  </table>

  <script type="coffee">
  </script>

  <style type="scss">
    competition-standings-table {
      table {
        width: 100%;
      }
      td {
        text-align: right;
      }
      td.cell--non-numeric {
        text-align: left;
      }
    }
  </style>
</competition-standings-table>
