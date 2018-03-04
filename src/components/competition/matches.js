import { h, Component } from 'preact';
import matchService from '../../services/match';

import Matches from '../shared/matches';

const PER_PAGE = 10;
const HARD_LIMIT = 50; // forced by API

export default class extends Component {
  state = {
    matches: false
  }

  limit = PER_PAGE;

  componentDidMount () {
    this.fetchData();
  }

  render () {
    const { matches } = this.state;

    if (!matches) {
      return false;
    }

    const { type } = this.props;

    return (
      <div class={`${type}-matches block wrapped`}>
        {type === 'past' && this.hasMore() && this.renderMoreButton()}
        <Matches matches={matches} />
        {type === 'future' && this.hasMore() && this.renderMoreButton()}
      </div>
    );
  }

  renderMoreButton = () => {
    return (
      <p class="matches nav">
        <button onclick={this.moreMatches}>more</button>
      </p>
    );
  }

  fetchData = () => {
    const { seasonId, type } = this.props;
    // TODO: loading indicator
    matchService.seasonMatches(seasonId, type, this.limit).then(matches => this.setState({ matches }));
  }

  hasMore = () => {
    const length = this.state.matches.length;
    return (length < HARD_LIMIT && length % PER_PAGE === 0);
  }

  moreMatches = () => {
    this.limit = Math.min(this.limit + PER_PAGE, HARD_LIMIT);
    this.fetchData();
  }
}
