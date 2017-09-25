import { app, h } from 'hyperapp';
import { router } from "@hyperapp/router"

import actions from './actions';
import events from './events';
import state from './state';
import views from './views';

app({
  state,
  view: views,
  actions,
  events,
  mixins: [router()],
});
