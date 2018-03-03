import { location } from '@hyperapp/router';

import home from './home';
import competition from './competition';
import match from './match';
import search from './search';

export default {
  location: location.actions,

  reset() {
    return {
      home: {},
      competition: {},
      match: {},
    };
  },

  home,
  competition,
  match,
  search,
};
