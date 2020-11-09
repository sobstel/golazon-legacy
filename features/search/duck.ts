import { Dispatch } from "react";
import { delay, terminateDelay } from "common/util/delay";
import * as History from "common/util/history";
import api from "common/api";

import { uniqResults } from "./util";
import { SearchResult } from "./types";

type State = {
  query: string;
  results: SearchResult[];
  loading: boolean;
  error: string;
  activeResultIndex: number;
};

const SEARCH_START = "SEARCH_START";
const SEARCH_SUCCESS = "SEARCH_SUCCESS";
const SEARCH_ERROR = "SEARCH_ERROR";
const RESULTS_CHANGE = "RESULTS_CHANGED";
const QUERY_CHANGE = "QUERY_CHANGED";
const ACTIVE_RESULT_INDEX_CHANGE = "ACTIVE_RESULT_INDEX_CHANGE";

type Action = {
  type: string;
  payload: Partial<State> & { indexChange?: number };
};

export const initialState: State = {
  query: "",
  results: [],
  loading: false,
  error: "",
  activeResultIndex: -1,
};

// Reducer
export function reducer(state: State, { type, payload }: Action) {
  if (type === SEARCH_START) {
    return { ...state, loading: true };
  }

  if (type === "SEARCH_SUCCESS") {
    const { results } = payload;
    return {
      ...state,
      results: uniqResults(results),
      loading: false,
      error: null,
      activeResultIndex: -1,
    };
  }

  if (type === SEARCH_ERROR) {
    const { error } = payload;
    return {
      ...state,
      error,
      loading: false,
      results: [],
      activeResultIndex: -1,
    };
  }

  if (type === QUERY_CHANGE) {
    const { query } = payload;
    return { ...state, query };
  }

  if (type === RESULTS_CHANGE) {
    const { results } = payload;
    return {
      ...state,
      results: uniqResults(results),
      loading: false,
      error: null,
      activeResultIndex: -1,
    };
  }

  if (type === ACTIVE_RESULT_INDEX_CHANGE) {
    const { indexChange } = payload;

    let nextIndex = state.activeResultIndex + indexChange;
    if (nextIndex >= state.results.length) {
      nextIndex = 0;
    }
    if (nextIndex < 0) {
      nextIndex = Math.max(state.results.length - 1, 0);
    }
    return { ...state, activeResultIndex: nextIndex };
  }

  return state;
}

function searchStart() {
  return { type: SEARCH_START };
}

function searchSuccess(results: State["results"]) {
  return { type: SEARCH_SUCCESS, payload: { results } };
}

function searchError(error: State["error"]) {
  return { type: SEARCH_ERROR, payload: { error } };
}

export function queryChange(query: State["query"]) {
  return { type: QUERY_CHANGE, payload: { query } };
}

export function resultsChange(results: State["results"]) {
  return { type: SEARCH_SUCCESS, payload: { results } };
}

export function incrementActiveResultIndex() {
  return { type: ACTIVE_RESULT_INDEX_CHANGE, payload: { indexChange: 1 } };
}

export function decrementActiveResultIndex() {
  return { type: ACTIVE_RESULT_INDEX_CHANGE, payload: { indexChange: -1 } };
}

const MAX_RESULTS = 20;

export function asyncSearch(query: string) {
  return (dispatch: Dispatch<unknown>) => {
    terminateDelay();

    // all history results
    if (query.length === 0) {
      const historyResults = History.all().slice(0, MAX_RESULTS);
      dispatch(resultsChange(historyResults));
      return;
    }

    // search in history
    const filteredHistoryResults = History.search(query).slice(0, MAX_RESULTS);
    dispatch(resultsChange(filteredHistoryResults));

    // search full database
    if (filteredHistoryResults.length < MAX_RESULTS) {
      dispatch(searchStart());

      delay(0.3, () => {
        api(`competitions?q=${query}`)
          .then((results) => {
            const mergedResults = filteredHistoryResults
              .concat(results)
              .slice(0, MAX_RESULTS);
            dispatch(searchSuccess(mergedResults));
          })
          .catch((e) => {
            dispatch(searchError(e.message));
          });
      });
    }
  };
}
