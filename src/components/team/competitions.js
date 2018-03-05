import { h, Component } from 'preact';
import teamService from '../../services/team';
import loadable from '../util/loadable';

class Competitions extends Component {
  render () {
    const { competitions } = this.props;

    console.log(competitions);

    if (!competitions.length) {
      return null;
    }

    return (
      <div class="compeitions__container block wrapped">
        {competitions.map(competition => (
          <p>
            {competition['name']} {competition['season']['name']} ({competition['area_name']})
          </p>
        ))}
      </div>
    );
  }
}

const dataSource = ({ teamId }) => {
  return teamService.competitions(teamId).then(competitions => ({ competitions }));
};

export default loadable(dataSource)(Competitions);
