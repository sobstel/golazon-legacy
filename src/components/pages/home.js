import { h, Component } from "preact";

import LiveMatches from "../live_matches";

export default class extends Component {
  componentDidMount() {
    document.title = "Golazon";
  }

  render() {
    return <LiveMatches />;
  }
}
