import { location } from '@hyperapp/router';

export default {
  location: location.state,

  siteTitle: 'Golazon',

  search: {
    clearButtonVisible: false,
    hint: false,
    loading: false,
    results: [],
    resultsHint: false,
    value: null,
  },

  home: {},
  competition: {},
  match: {},
};
