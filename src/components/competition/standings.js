import { h, Component } from 'preact';
import tableService from '../../services/table';
import loadable from '../util/loadable';

class Standings extends Component {
  render () {
    const { rounds } = this.props;

    return (
      <div class="standings__container block wrapped">
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
                    <td class={this.rankClass(table.zone)}>
                      <span>{table.rank}</span>
                    </td>
                    <td class="team" title={table['team_name']}>
                      <a href={`/t/${table['team_id']}`}>{table['team_name']}</a>
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
  }

  rankClass = (zone) => {
    if (!zone) {
      return 'rank';
    }
    return `rank zone zone-${zone}`;
  }
}

const dataSource = ({ seasonId }) => {
  return tableService.seasonStandings(seasonId).then(rounds => ({ rounds }));
};

export default loadable(dataSource)(Standings);
