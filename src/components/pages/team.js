import { h, Component } from 'preact';
import teamService from '../../services/team';
import loadable from '../util/loadable';

import TeamCompetitions from '../team/competitions';
import TeamMatches from '../team/matches';

class Team extends Component {
  componentDidMount () {
    const { team } = this.props;

    document.title = team.name;
  }

  render () {
    const { team } = this.props;
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
          <TeamCompetitions teamId={teamId} />
          <TeamMatches teamId={teamId} type='past' />
          <TeamMatches teamId={teamId} type='future' />
        </div>
      </div>
    );
  }
}

const dataSource = async ({ id }) => {
  const team = await teamService.team(id);
  return ({ team });
};

export default loadable(dataSource)(Team);
