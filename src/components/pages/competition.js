import { h, Component } from 'preact';
import competitionService from '../../services/competition';
import loadable from '../util/loadable';

import CompetitionMatches from '../competition/matches';
import CompetitionStandings from '../competition/standings';

class Competition extends Component {
  render () {
    const { competition } = this.props;

    if (!competition) {
      return null;
    }

    let title = `${competition.name} ${competition.season.name} (${competition['area_name']})`;
    if (competition.type !== 'default') {
      title += ` ${competition.type}`;
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
          <CompetitionMatches seasonId={seasonId} type='past' />
          <CompetitionMatches seasonId={seasonId} type='future' />
          <CompetitionStandings seasonId={seasonId} />
        </div>
      </div>
    );
  }
}

const dataSource = ({ id }) => {
  return competitionService.competition(id).then(competition => ({ competition }));
};

export default loadable(dataSource)(Competition);
