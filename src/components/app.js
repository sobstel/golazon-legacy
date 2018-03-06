import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Search from './search';
import Home from './pages/home';
import Competition from './pages/competition';
import Match from './pages/match';
import Team from './pages/team';
import Error404 from './pages/error404';

export default class extends Component {
  render() {
    return (
      <div id="app">
        <Search />

        <Router>
          <Home path="/" />
          <Competition path="/c/:id" />
          <Match path="/m/:id" />
          <Team path="/t/:id" />
          <Error404 default />
        </Router>

        <p class="disclaimer block">
          Football data mnmlist way. Open source prototype.<br />
          (<a href="https://github.com/sobstel/golazon#readme">learn more</a>)
        </p>
      </div>
    );
  }
}
