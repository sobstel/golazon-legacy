import { app, h } from 'hyperapp';
import { location } from '@hyperapp/router';

import actions from './actions';
// import events from './events';
import state from './state';

import Layout from './views/Layout';

const main = app(
  state,
  actions,
  Layout,
  document.body,
);

location.subscribe(main.location);
