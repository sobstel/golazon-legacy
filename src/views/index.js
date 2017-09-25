import { h } from 'hyperapp';

import Main from '../components/main';

export default [
  [
    '/',
    () =>
      <Main>
        home
      </Main>
  ],

  [
    '/c/:competition_id',
    (state) => (
      <Main>
        <div class="competition">
          <p class="block nav">
            <a href="/">Golazon</a>
          </p>

          <h1 class="competition__title block wrapped">
            <loading />
            { state.title }
          </h1>
        </div>
      </Main>
    )
  ],

  [
    '/m/:match_id',
    () =>
      <Main>
        match
      </Main>
  ],

  [
    '*',
    () =>
      <Main>
        <div class="block error404__wrapper">
          <p>Page not found. <a href="/">Go home</a> or use search above.</p>
        </div>
      </Main>
  ],
];
