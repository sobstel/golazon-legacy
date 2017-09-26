import { request, delay, terminateDelay, uniqBy } from '../lib/util';
import * as History from '../lib/history';

const MAX_RESULTS = 10;

export default {
  search(state, actions, e) {
    return (update) => {
      const text = e.target.value;

      if ((e.keyCode === 40) && (state.search.results.length > 0)) { // down arrow
        actions.search.hoverResult(1);
        return;
      }

      if ((e.keyCode === 38) && (state.search.results.length > 0)) { // up arrow
        actions.search.hoverResult(-1);
        return;
      }

      if (e.keyCode === 27) { // esc
        actions.search.onSearchClearClick();
        return;
      }

      if (e.keyCode === 13) { // enter
        const activeItem = state.search.results.find(result => result.active === true);
        actions.router.go(`/c/${activeItem.id}`);
        actions.search.exitSearch();
        return;
      }

      // restart
      terminateDelay(delay);
      update(prevState => (
        { ...prevState, search: { ...prevState.search, resultsHint: null, value: text } }
      ));

      if (text.length === 0) {
        const historyResults = History.all().slice(0, MAX_RESULTS);

        update(prevState => (
          { ...prevState, search: { ...prevState.search, results: historyResults } }
        ));
        return;
      }

      if (text.length > 0) {
        update(prevState => (
          { ...prevState, search: { ...prevState.search, clearButtonVisible: true } }
        ));
      }

      const historyResults = History.search(text).slice(0, MAX_RESULTS);
      if (historyResults.length > 0) {
        update(prevState => (
          { ...prevState, search: { ...prevState.search, results: historyResults } }
        ));
      }

      if (historyResults.length < MAX_RESULTS) {
        if (text.length < 4) {
          const resultsHint = 'type 4 letters or more to search full database...';
          update(prevState => ({ ...prevState, search: { ...prevState.search, resultsHint } }));
          return;
        }

        update(prevState => ({ ...prevState, search: { ...prevState.search, loading: true } }));

        delay(0.25, () => {
          request(`/search?q=${text}`, (results) => {
            let hint = null;
            if (results.length === 0 && historyResults.length === 0) {
              hint = 'no results found';
            }

            update((prevState) => {
              // Set is here to ensure uniqueness and order
              const mergedResults = uniqBy(historyResults.concat(results), 'id')
                .slice(0, MAX_RESULTS);

              return {
                ...prevState,
                search: {
                  ...prevState.search,
                  hint,
                  loading: false,
                  results: mergedResults,
                },
              };
            });
          });
        });
      }
    };
  },

  onSearchClearClick(state, actions) {
    return (update) => {
      update(prevState => ({ ...prevState, search: { ...prevState.search, value: null } }));
      actions.search.exitSearch();
    };
  },

  onSearchResultClick(state, actions, e) {
    e.preventDefault();
    actions.router.go(e.target.pathname);
    actions.search.exitSearch();
  },

  hoverResult(state, actions, step) {
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

  exitSearch(state) {
    return {
      ...state,
      search: {
        ...state.search,
        clearButtonVisible: false,
        hint: false,
        loading: false,
        results: [],
        resultsHint: false,
      },
    };
  },
};
