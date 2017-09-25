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
    '/c/:competitionId',
    () => (
      <Main>
        competition
      </Main>
    )
  ],

  [
    '/m/:matchId',
    () =>
      <Main>
        match
      </Main>
  ],

  [
    '*',
    () =>
      <Main>
        404
      </Main>
  ],
];
