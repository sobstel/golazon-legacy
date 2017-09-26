import { h } from 'hyperapp';

import Main from '../components/Main';
import Standings from '../components/standings';

export default [
  [
    '/',
    () => (
      <Main>
        home
      </Main>
    ),
  ],

  [
    '/c/:competition_id',
    state => (
      <Main>
        <div class="competition">
          <p class="block nav">
            <a href="/">Golazon</a>
          </p>

          <h1 class="competition__title block wrapped">
            <loading />
            {state.competition.title}
          </h1>

          <div class="competition__container">
            {state.competition.standings && <Standings rounds={state.competition.standings} />}
          </div>
        </div>
      </Main>
    ),
  ],

  [
    '/m/:match_id',
    () => (
      <Main>
        match
      </Main>
    ),
  ],

  [
    '*',
    () => (
      <Main>
        <div class="block error404__wrapper">
          <p>Page not found. <a href="/">Go home</a> or use search above.</p>
        </div>
      </Main>
    ),
  ],
];
