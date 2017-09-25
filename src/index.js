import { app, h } from 'hyperapp';
import { router, Link } from "@hyperapp/router"

// import actions from './actions';
// import state from './state';
import App from './components/app';
import Home from './components/home';
import Competition from './components/Competition';
import Match from './components/Match';

app({
  view: [
    [
      '/',
      () => (
        <App>
          <Home />
        </App>
      ),
    ],
    [
      '/c/:competitionId',
      state => (
        <App>
          <Competition id={ state.router.params.competitionId } />
        </App>
      ),
    ],
    [
      '/m/:match',
      state => (
        <App>
          <Match id={ state.router.params.matchId } />
        </App>
      ),
    ],
    [
      '*',
      () => (
        <App>
          <div>404</div>
        </App>
      ),
    ],
  ],
  // state,
  // actions,
  mixins: [router()],
});
