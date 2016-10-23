<competition-standings-table>
  <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
    <tr each={ standings }>
      <td>{ rank }</td>
      <td class="mdl-data-table__cell--non-numeric">{ team_name }</td>
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
    }
  </style>
</competition-standings-table>
