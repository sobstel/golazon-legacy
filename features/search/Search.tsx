import { useReducer, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import classNames from "classnames";
import Highlighter from "react-highlight-words";
import {
  reducer,
  initialState,
  asyncSearch,
  queryChange,
  resultsChange,
  incSelectedIndex,
  decSelectedIndex,
  resetSelectedIndex,
} from "./duck";
import useAsyncDispatch from "./hooks/useAsyncDispatch";

const KEY_CODES = {
  ARROW_DOWN: 40,
  ARROW_UP: 38,
  ESC: 27,
  ENTER: 13,
};

export function Search() {
  const [
    { query, results, loading, error, selectedIndex },
    dispatch,
  ] = useReducer(reducer, initialState);
  const asyncDispatch = useAsyncDispatch(dispatch);
  const input = useRef(null);

  const noResults = results.length === 0;
  const clearable = query?.length > 0;

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === KEY_CODES.ARROW_DOWN) {
      if (results.length > 0) {
        dispatch(incSelectedIndex());
      } else {
        asyncDispatch(asyncSearch(query));
      }
    }
    if (keyCode === KEY_CODES.ARROW_UP) {
      dispatch(decSelectedIndex());
    }
  };
  const handleKeyUp = ({ keyCode }) => {
    if (keyCode === KEY_CODES.ESC) {
      dispatch(resultsChange([]));
    }
    if (keyCode === KEY_CODES.ENTER && results.length > 0) {
      const index = selectedIndex !== -1 ? selectedIndex : 0;
      dispatch(resultsChange([]));
      dispatch(queryChange(""));
      Router.push(`/c/${results[index]["competition_id"]}`);
    }
  };
  const handleChange = (e) => {
    const query = e.target.value;
    dispatch(queryChange(query));
    asyncDispatch(asyncSearch(query, results));
  };
  const handleFocus = () => {
    asyncDispatch(asyncSearch(query, results));
  };
  const handleBlur = () => {
    dispatch(resultsChange([]));
  };
  const handleClear = () => {
    dispatch(queryChange(""));
  };
  const handleMouseDown = (e) => {
    // prevent input blur on click (thus clearing results before actual lick)
    e.preventDefault();
  };
  const handleMouseOver = () => {
    dispatch(resetSelectedIndex());
  };
  const handleClick = () => {
    dispatch(queryChange(""));
    input.current.blur();
  };

  return (
    <header className="search__container block" role="banner">
      <div className="search__input-container" role="search">
        <input
          type="text"
          className={classNames("search__input", {
            "search__input--clearable": clearable,
          })}
          name="q"
          placeholder="Enter country or tournament name"
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={query || ""}
          ref={input}
        />

        {clearable && (
          <button className="search__clear-button" onClick={handleClear}>
            &#215;
          </button>
        )}
      </div>
      <div>
        {noResults && error && <p className="search__error">ERROR: {error}</p>}

        <ul className="search__results">
          {results.map((result, i) => (
            <li key={result["competition_id"]}>
              <Link href={`/c/${result["competition_id"]}`}>
                <a
                  onMouseDown={handleMouseDown}
                  onMouseOver={handleMouseOver}
                  onClick={handleClick}
                  className={classNames({ active: selectedIndex === i })}
                >
                  <Highlighter
                    highlightClassName="search__highlight"
                    searchWords={[query]}
                    autoEscape={false}
                    textToHighlight={result.name}
                  />{" "}
                  {result["area_name"] && (
                    <span>
                      (
                      <Highlighter
                        highlightClassName="search__highlight"
                        searchWords={[query]}
                        autoEscape={true}
                        textToHighlight={result["area_name"]}
                      />
                      ){" "}
                    </span>
                  )}
                  {result.teamtype}
                </a>
              </Link>
            </li>
          ))}

          {loading && <li className="search__loader loader">loading</li>}
        </ul>
      </div>
    </header>
  );
}
