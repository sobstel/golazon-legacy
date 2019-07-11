import { h, Component } from 'preact';
import competitionService from '../../services/competition';
import loadable from '../util/loadable';

import CompetitionMatches from '../competition/matches';
import CompetitionStandings from '../competition/standings';

class Competition extends Component {
  componentDidMount () {
    document.title = this.title();
  }

  render () {
    const { competition } = this.props;
    const seasonId = competition['season']['season_id'];

    return (
      <div>
        <p class="block nav">
          <a href="/">Golazon</a>
        </p>

        <h1 class="competition__title block wrapped">
          {this.title()}
        </h1>

        <div class="competition__container">
          <CompetitionMatches seasonId={seasonId} type='past' />
          <CompetitionMatches seasonId={seasonId} type='future' />
          <CompetitionStandings seasonId={seasonId} />
        </div>
      </div>
    );
  }

  title = () => {
    const { competition } = this.props;

    let title = `${competition.name} ${competition.season.name}`;
    if (competition['area_name']) {
      title += ` (${competition['area_name']})`;
    }
    if (competition.teamtype) {
      title += ` ${competition.teamtype}`;
    }

    return title;
  }
}

const dataSource = async ({ id }) => {
  const competition = await competitionService.competition(id);
  return ({ competition });
};

export default loadable(dataSource)(Competition);
