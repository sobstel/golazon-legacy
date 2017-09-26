import { h } from 'hyperapp';

import Main from '../components/Main';
import Competition from './Competition';
import Match from './Match';
import Error404 from './Error404';

export default [
  ['/', () => (<Main>home</Main>)],
  ['/c/:competition_id', Competition],
  ['/m/:match_id', Match],
  ['*', Error404],
];
