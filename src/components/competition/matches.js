import { h, Component } from 'preact';
import matchService from '../../services/match';
import loadable from '../util/loadable';

import Matches from '../shared/matches';

const PER_PAGE = 10;
const HARD_LIMIT = 50; // forced by API

class CompetitionMatches extends Component {
  render () {
    const { matches, type } = this.props;

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
        <button onclick={this.props.increaseLimit}>more</button>
      </p>
    );
  }

  hasMore = () => {
    const { matches } = this.props;
    return (matches.length < HARD_LIMIT && matches.length % PER_PAGE === 0);
  }
}

const dataSource = ({ seasonId, type, limit }) => {
  return matchService.seasonMatches(seasonId, type, limit).then(matches => ({ matches }));
};

const limitable = (WrappedComponent) => {
  return class extends Component {
    state = {
      limit: PER_PAGE,
      visible: true // to force mount/unmount
    }

    render () {
      if (!this.state.visible) {
        return null;
      }

      return (
        <WrappedComponent
          limit={this.state.limit}
          increaseLimit={this.increaseLimit}
          {...this.props} />
      );
    }

    increaseLimit = () => {
      this.setState({ visible: false });
      setTimeout(() => {
        this.setState({
          limit: Math.min(this.state.limit + PER_PAGE, HARD_LIMIT),
          visible: true
        });
      });
    }
  };
};

export default limitable(loadable(dataSource)(CompetitionMatches));
