import { h, Component } from 'preact';
import competitionService from '../../services/competition';
import loadable from '../util/loadable';

import Standings from '../competition/standings';
import Matches from '../competition/matches';

class Competition extends Component {
  render () {
    const competition = this.props.data;

    if (!competition) {
      return null;
    }

    let title = `${competition.name} ${competition.season.name} (${competition['area_name']})`;
    if (competition.teamtype !== 'default') {
      title += ` ${competition.teamtype}`;
    }
    document.title = title;

    const seasonId = competition['season']['season_id'];

    return (
      <div>
        <p class="block nav">
          <a href="/">Golazon</a>
        </p>

        <h1 class="competition__title block wrapped">
          {title}
        </h1>

        <div class="competition__container">
          <Matches seasonId={seasonId} type='past' />
          <Matches seasonId={seasonId} type='future' />
          <Standings seasonId={seasonId} />
        </div>
      </div>
    );
  }
}

const dataSource = ({ id }) => {
  return competitionService.competition(id);
};

export default loadable(dataSource)(Competition);
