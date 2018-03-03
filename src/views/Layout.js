import { h } from 'hyperapp';
import { Route, Switch } from '@hyperapp/router';

import routePatterns from '../lib/routePatterns';
import Search from '../components/Search';
import Home from './Home';

// [routePatterns.home, Home],
// [routePatterns.competition, Competition],
// [routePatterns.match, Match],
// ['*', Error404],

// main layout
export default (state, actions) => (
  <div>
    <Search
      actions={actions}
      clearButtonVisible={state.search.clearButtonVisible}
      hint={state.search.hint}
      loading={state.search.loading}
      results={state.search.results}
      resultsHint={state.search.resultsHint}
      value={state.search.value}
    />

    <Switch>
      <Route path="/" render={() => Home(state, actions)} />
    </Switch>

    <p class="disclaimer block">
      Football data mnmlist way. Open source prototype.<br />
      (<a href="https://github.com/sobstel/golazon#readme">learn more</a>)
    </p>
  </div>
);
