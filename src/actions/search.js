import { request, delay, terminateDelay, uniqBy } from '../lib/util';
import * as History from '../lib/history';

const MAX_RESULTS = 15;

export default {
  search: e => (state, actions) => {
    const text = e.target.value;

    if ((e.keyCode === 40) && (state.results.length > 0)) { // down arrow
      actions.search.hoverResult(1);
      return {};
    }

    if ((e.keyCode === 38) && (state.results.length > 0)) { // up arrow
      actions.search.hoverResult(-1);
      return {};
    }

    if (e.keyCode === 27) { // esc
      actions.search.onSearchClearClick();
      return {};
    }

    if (e.keyCode === 13) { // enter
      const activeItem = state.search.results.find(result => result.active === true);
      actions.location.go(`/c/${activeItem.id}`);
      actions.search.exitSearch();
      return {};
    }

    // restart
    terminateDelay(delay);

    let nextState = {
      ...state,
      resultsHint: null,
      value: text,
      clearButtonVisible: true,
    };

    if (text.length === 0) {
      const historyResults = History.all().slice(0, MAX_RESULTS);

      return { ...nextState, results: historyResults };
    }

    const historyResults = History.search(text).slice(0, MAX_RESULTS);
    if (historyResults.length > 0) {
      nextState = { ...nextState, results: historyResults };
    }

    if (historyResults.length < MAX_RESULTS) {
      if (text.length < 4) {
        const resultsHint = 'type 4 letters or more to search full database...';
        return { ...nextState, resultsHint };
      }

      actions.search.isLoading(true);

      delay(0.25, () => {
        request(`/search?q=${text}`, (results) => {
          let hint = null;
          if (results.length === 0 && historyResults.length === 0) {
            hint = 'no results found';
          }

          // Set is here to ensure uniqueness and order
          const mergedResults = uniqBy(historyResults.concat(results), 'id')
            .slice(0, MAX_RESULTS);

          return { hint, loading: false, results: mergedResults };
        });
      });
    }
  },

  onSearchClearClick: () => (state, actions) => {
    actions.search.exitSearch();
    return { value: null };
  },

  onSearchResultClick: e => (state, actions) => {
    e.preventDefault();
    actions.location.go(e.target.pathname);
    actions.search.exitSearch();
  },

  hoverResult: step => (state) => {
    let results = state.search.results;
    let index = results.findIndex(result => result.active === true);

    index += step;
    if (index >= results.length) {
      index = 0;
    }
    if (index < 0) {
      index = Math.max(results.length - 1, 0);
    }

    results = results.map(result => ({ ...result, active: false }));
    results[index].active = true;

    return { ...state, search: { ...state.search, results } };
  },

  exitSearch: () => () => {
    return {
      clearButtonVisible: false,
      hint: false,
      loading: false,
      results: [],
      resultsHint: false,
    };
  },

  isLoading: isLoading => () => ({ isLoading }),
};
