import { h } from 'hyperapp';

// competition standings
export default ({ rounds }) => {
  const rankClass = (zone) => {
    if (!zone) {
      return 'rank';
    }
    return `rank zone zone-${zone}`;
  };

  return (
    <div>
      {rounds.map(round => (
        <div class="standings">
          <h2>{round.name}</h2>

          <table class="standings-table">
            <thead>
              <tr>
                <th class="rank">
                  &nbsp;
                </th>
                <th class="team">
                  Team
                </th>
                <th class="mp">
                  <acronym title="Matches Played">MP</acronym>
                </th>
                <th class="gd">
                  <acronym title="Goals For / Goals Against">GF&#8209;GA</acronym>
                </th>
                <th class="pts">
                  <acronym title="Points">Pts</acronym>
                </th>
              </tr>
            </thead>
            <tbody>
              {round.standings.map(table => (
                <tr>
                  <td class={rankClass(table.zone)}>
                    <span>{table.rank}</span>
                  </td>
                  <td class="team" title={table['team_name']}>
                    {table['team_name']}
                  </td>
                  <td class="mp">
                    {table.matches}
                  </td>
                  <td class="gd">
                    {table['goals_for']}&nbsp;-&nbsp;{table['goals_against']}
                  </td>
                  <td class="pts">
                    {table.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
