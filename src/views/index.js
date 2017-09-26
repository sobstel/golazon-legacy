import { h } from 'hyperapp';

import Competition from './Competition';
import Home from './Home';
import Match from './Match';
import Error404 from './Error404';

export default [
  ['/', Home],
  ['/c/:competition_id', Competition],
  ['/m/:match_id', Match],
  ['*', Error404],
];
