import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Search from './components/search';
import Home from './components/pages/home';
import Competition from './components/pages/competition';
import Match from './components/pages/match';
import Team from './components/pages/team';
import Error404 from './components/pages/error404';

export default class extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => this.currentUrl = e.url;

  render() {
    return (
      <div id="app">
        <Search />

        <Router onChange={this.handleRoute}>
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
