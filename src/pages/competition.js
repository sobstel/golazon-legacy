import { h, Component } from 'preact';
import * as History from '../lib/history';
import competitionService from '../services/competition';

import Standings from '../components/competition/standings';
import Matches from '../components/competition/matches';

export default class extends Component {
  state = {
    title: false,
    competition: false
  }

  componentDidMount () {
    competitionService.competition(this.props.id).then(competition => {
      if (!competition) {
        // TODO: handle "not found"
        return;
      }

      let title = `${competition.name} ${competition.season.name} (${competition['area_name']})`;
      if (competition.teamtype !== 'default') {
        title += ` ${competition.teamtype}`;
      }

      this.setState({ competition, title });
      document.title = title;

      // each competition read is recorded
      History.add({
        area_name: competition['area_name'],
        id: competition.competition_id,
        name: competition.name,
        teamtype: competition.teamtype,
        type: 'competition'
      });
    });
  }

  render () {
    const { competition, title } = this.state;

    if (!competition) {
      return null;
    }

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
