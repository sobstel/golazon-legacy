import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import Highlighter from "react-highlight-words";
import { delay, terminateDelay } from "../util/delay";
import { uniqBy } from "../util/uniqBy";
import * as History from "../util/history";
import api from "../util/api";

const KEY_CODES = {
  DOWN: 40,
  UP: 38,
  ESC: 27,
  ENTER: 13,
};

const MAX_RESULTS = 20;

export default class extends Component {
  state = {
    clearButtonVisible: false,
    hint: false,
    loading: false,
    results: [],
    value: null,
  };

  render() {
    const noResults = this.state.results.length === 0;

    const activeClassName = (className) =>
      this.state.clearButtonVisible
        ? `${className} ${className}--active`
        : className;

    return (
      <header className="search__container block" role="banner">
        <div className="search__input-container" role="search">
          <input
            type="text"
            className={activeClassName("search__input")}
            name="q"
            placeholder="Search: country or tournament name"
            onKeyUp={this.search}
            onFocus={this.search}
            defaultValue={this.state.value || ""}
          />

          {this.state.clearButtonVisible && (
            <button
              className={activeClassName("search__clear-button")}
              onClick={this.clearSearch}
            >
              &#215;
            </button>
          )}
        </div>
        <div className="search__extras-container">
          {noResults && this.state.loading && (
            <p className="search__hint">
              {this.state.loading && <span className="loader">loading</span>}
            </p>
          )}

          {noResults && this.state.hint && (
            <p className="search__hint">{this.state.hint}</p>
          )}

          <ul className="search__results">
            {this.state.results.map((result) => (
              <li key={result["competition_id"] || result["name"]}>
                <Link href={`/c/${result["competition_id"]}`}>
                  <a
                    onClick={this.exitSearch}
                    className={result.active && "active"}
                  >
                    <Highlighter
                      highlightClassName="search__highlight"
                      searchWords={[this.state.value]}
                      autoEscape={false}
                      textToHighlight={result.name}
                    />{" "}
                    {result["area_name"] && (
                      <span>
                        (
                        <Highlighter
                          highlightClassName="search__highlight"
                          searchWords={[this.state.value]}
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

            {this.state.loading && (
              <li className="search__loader loader">loading more</li>
            )}
          </ul>
        </div>
      </header>
    );
  }

  search = (e) => {
    const text = e.target.value;
    const { keyCode } = e;

    if (keyCode === KEY_CODES.DOWN && this.state.results.length > 0) {
      this.hoverResult(1);
      return;
    }

    if (keyCode === KEY_CODES.UP && this.state.results.length > 0) {
      this.hoverResult(-1);
      return;
    }

    if (keyCode === KEY_CODES.ESC) {
      this.clearSearch();
      return;
    }

    if (keyCode === KEY_CODES.ENTER) {
      const activeItem = this.state.results.find(
        (result) => result.active === true
      );
      this.exitSearch();
      Router.push(`/c/${activeItem["competition_id"]}`);
      return;
    }

    // restart
    terminateDelay();
    this.setState({ value: text, clearButtonVisible: true });

    // all history results
    if (text.length === 0) {
      const historyResults = History.all().slice(0, MAX_RESULTS);

      this.setState({ results: historyResults });
      return;
    }

    // search in history
    const historyResults = History.search(text).slice(0, MAX_RESULTS);

    if (historyResults.length > 0) {
      this.setState({ results: historyResults });
    }

    // search full database
    if (historyResults.length < MAX_RESULTS) {
      this.setState({ loading: true });

      delay(0.25, () => {
        api(`competitions?q=${text}`)
          .then((results) => {
            let hint = false;
            if (results.length === 0) {
              hint = "no results found";
            }

            const mergedResults = uniqBy(
              historyResults.concat(results),
              "competition_id"
            ).slice(0, MAX_RESULTS);
            this.setState({ hint, loading: false, results: mergedResults });
          })
          .catch((err) => {
            this.setState({
              hint: `ERROR: ${err.message}`,
              loading: false,
              results: [],
            });
          });
      });
    }
  };

  hoverResult = (step) => {
    const { results } = this.state;
    let index = results.findIndex((result) => result.active === true);

    index += step;
    if (index >= results.length) {
      index = 0;
    }
    if (index < 0) {
      index = Math.max(results.length - 1, 0);
    }

    const nextResults = results.map((result) => ({ ...result, active: false }));
    nextResults[index].active = true;

    this.setState({ results: nextResults });
  };

  clearSearch = () => {
    this.setState({ value: null });
    this.exitSearch();
  };

  exitSearch = () => {
    this.setState({
      clearButtonVisible: false,
      hint: false,
      loading: false,
      results: [],
    });
  };
}
