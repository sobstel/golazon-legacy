import { h, Component } from 'preact';

import LiveMatches from '../components/live_matches';

export default class Home extends Component {
  componentDidMount () {
    document.title = 'Golazon';
  }

  render() {
    return (
      <LiveMatches />
    );
  }
}
