<standings-table>
  <table>
    <tr each={ standings }>
      <td>{ rank }</td>
      <td>{ team_name }</td>
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
</standings-table>
