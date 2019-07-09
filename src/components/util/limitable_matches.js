import { h, Component } from 'preact';
import loadable from '../util/loadable';
import limitable from '../util/limitable';

import Matches from '../shared/matches';

class LimitableMatches extends Component {
  render () {
    const { matches, type } = this.props;

    if (!matches || matches.length === 0) {
      return null;
    }

    return (
      <div class={`${type}-matches block wrapped`}>
        {type === 'past' && this.props.hasMore(matches) && this.renderMoreButton()}
        <Matches matches={matches} />
        {type === 'future' && this.props.hasMore(matches) && this.renderMoreButton()}
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
}

export default (dataSource) => {
  return limitable(loadable(dataSource)(LimitableMatches));
};
