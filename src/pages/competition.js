import { h, Component } from 'preact';
import * as History from '../lib/history';
import competitionService from '../services/competition';

export default class Competition extends Component {
  state = {
    title: false,
    competition: false
  }

  componentDidMount () {
    competitionService.find(this.props.id).then(competition => {
      if (!competition) {
        // TODO: handle "not found"
        return;
      }

      let title = `${competition.name} ${competition.season.name} (${competition['area_name']})`;
      if (competition.teamtype !== 'default') {
        title += ` ${competition.teamtype}`;
      }

      document.title = title;

      this.setState({ competition, title });

      // each competition read is recorded
      History.add({
        area_name: competition['area_name'],
        id: competition.competition_id,
        name: competition.name,
        teamtype: competition.teamtype,
        type: 'competition',
      });

      // const seasonId = competition.season['season_id'];
      //
      // actions.competition.fetchMatches({ type: 'past', seasonId });
      // actions.competition.fetchMatches({ type: 'future', seasonId });
      // actions.competition.fetchStandings({ seasonId });
    });
  }

  render () {
    const { competition, title } = this.state;

    if (!competition) {
      return null;
    }

    return (
      <div>
        <p class="block nav">
          <a href="/">Golazon</a>
        </p>

        <h1 class="competition__title block wrapped">
          {title}
        </h1>

        <div class="competition__container">

        </div>
      </div>
    );
  }
}
