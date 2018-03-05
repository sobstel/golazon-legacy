import { h, Component } from 'preact';
import teamService from '../../services/team';
import loadable from '../util/loadable';

import TeamMatches from '../team/matches';

class Team extends Component {
  render () {
    const { team } = this.props;

    if (!team) {
      return null;
    }

    document.title = team.name;

    const teamId = team['team_id'];

    return (
      <div>
        <p class="block nav">
          <a href="/">Golazon</a>
        </p>

        <h1 class="team__title block wrapped">
          {team.name}
        </h1>

        <div class="team__container">
          <TeamMatches teamId={teamId} type='past' />
          <TeamMatches teamId={teamId} type='future' />
        </div>
      </div>
    );
  }
}

const dataSource = ({ id }) => {
  return teamService.team(id).then(team => ({ team }));
};

export default loadable(dataSource)(Team);
