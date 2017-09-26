import { h } from 'hyperapp';
import routePatterns from '../lib/routePatterns';

import Competition from './Competition';
import Home from './Home';
import Match from './Match';
import Error404 from './Error404';

export default [
  [routePatterns.home, Home],
  [routePatterns.competition, Competition],
  [routePatterns.match, Match],
  ['*', Error404],
];
