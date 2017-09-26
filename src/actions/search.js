import { request, delay, terminateDelay } from '../lib/util';

export default {
  search(state, actions, e) {
    return (update) => {
      const text = e.target.value;

      if ((e.keyCode === 40) && (state.search.results.length > 0)) { // down arrow
        actions.search.activeResult(1);
      } else if ((e.keyCode === 38) && (state.search.results.length > 0)) { // up arrow
        actions.search.activeResult(-1);
      } else if (e.keyCode === 27) { // esc
        actions.search.onSearchClearClick();
      } else if (e.keyCode === 13) { // enter
        const activeItem = state.search.results.find(result => result.active === true);
        actions.router.go(`/c/${activeItem.id}`);
        actions.search.exitSearch();
      } else {
        terminateDelay(delay);

        update(prevState => (
          { ...prevState, search: { ...prevState.search, resultsHint: null, value: text } }
        ));

        if (text.length > 0) {
          update(prevState => (
            { ...prevState, search: { ...prevState.search, clearButtonVisible: true } }
          ));
        }

        // TODO: history
        // if (text.length === 0) {
        //   loading = false;
        //   this.results = history.getAll(10);
        //   active_result(0);
        //   this.update();
        //   return;
        // }

        // TODO: history search
        // this.results = history.search(text);


        if (text.length < 4) {
          const resultsHint = 'type 4 letters or more to search full database...';
          update(prevState => ({ ...prevState, search: { ...prevState.search, resultsHint } }));
          return;
        }

        //   // show before delay
        //   this.loading = true;
        //   this.update();
        //
        delay(0.25, () => {
          request(`/search?q=${text}`, (results) => {
            // TODO history
            // filter out results found in search history
            // this.results = this.results.concat(results.filter(result => {
            //   return this.results.filter(r => (r.type === result.type) && (r.id === result.id)).length === 0;
            // })
            // );
            let hint = null;

            if (results.length === 0) {
              hint = 'no results found';
            }

            update(prevState => ({ ...prevState, search: { ...prevState.search, results, hint } }));
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

  activeResult(state, actions, step) {
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
