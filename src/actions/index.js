import home from './home';
import competition from './competition';
import match from './match';

export default {
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
};
