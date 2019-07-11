import { h, Component } from 'preact';
import { route } from 'preact-router';
import Highlighter from "react-highlight-words";
import { delay, terminateDelay, uniqBy } from '../lib/util';
import * as History from '../lib/history';
import searchService from '../services/search';

const KEY_CODES = {
  DOWN: 40,
  UP: 38,
  ESC: 27,
  ENTER: 13
};

const MAX_RESULTS = 20;

export default class extends Component {
  state = {
    clearButtonVisible: false,
    hint: false,
    loading: false,
    results: [],
    value: null
  }

  render () {
    const noResults = this.state.results.length === 0;

    const activeClassName = (className) => (this.state.clearButtonVisible ? `${className} ${className}--active` : className);

    return (
      <header class="search__container block" role="banner">
        <div class="search__input-container" role="search">
          <input
            type="text"
            class={activeClassName('search__input')}
            name="q"
            placeholder="Search: country or tournament name"
            onkeyup={this.search}
            onfocus={this.search}
            value={this.state.value} />

          {this.state.clearButtonVisible &&
            <button
              class={activeClassName('search__clear-button')}
              onclick={this.clearSearch}
            >
              X
            </button>
          }
        </div>
        <div class="search__extras-container">
          {noResults && this.state.loading &&
            <p class="search__hint">
              {this.state.loading && <span class="loader">loading</span>}
            </p>
          }

          {noResults && this.state.hint &&
            <p class="search__hint">
              {this.state.hint}
            </p>
          }

          <ul class="search__results">
            {this.state.results.map(result => (
              <li>
                <a
                  href={`/c/${result.id}`}
                  onclick={this.exitSearch}
                  class={result.active && 'active'}
                >
                  <Highlighter
                    highlightClassName="search__highlight"
                    searchWords={[this.state.value]}
                    autoEscape={false}
                    textToHighlight={result.name}
                  />{' '}
                  {result['area_name'] &&
                    <span>
                      (
                      <Highlighter
                        highlightClassName="search__highlight"
                        searchWords={[this.state.value]}
                        autoEscape={true}
                        textToHighlight={result['area_name']}
                      />
                      ){' '}
                    </span>
                  }
                  {result.teamtype}
                </a>
              </li>
            ))}

            {this.state.loading &&
              <li class="search__loader loader">
                loading more
              </li>
            }
          </ul>
        </div>
      </header>
    );
  }

  search = (e) => {
    const text = e.target.value;
    const { keyCode } = e;

    if ((keyCode === KEY_CODES.DOWN) && (this.state.results.length > 0)) {
      this.hoverResult(1);
      return;
    }

    if ((keyCode === KEY_CODES.UP) && (this.state.results.length > 0)) {
      this.hoverResult(-1);
      return;
    }

    if (keyCode === KEY_CODES.ESC) {
      this.clearSearch();
      return;
    }

    if (keyCode === KEY_CODES.ENTER) {
      const activeItem = this.state.results.find(result => result.active === true);
      this.exitSearch();
      route(`/c/${activeItem.id}`);
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
        searchService.search(text).then(results => {
          let hint = false;
          if (results.length === 0) {
            hint = 'no results found';
          }

          const mergedResults = uniqBy(historyResults.concat(results), 'id').slice(0, MAX_RESULTS);
          this.setState({ hint, loading: false, results: mergedResults });
        }).catch((err) => {
          this.setState({ hint: `ERROR: ${err.message}`, loading: false, results: [] });
        });
      });
    }
  }

  hoverResult = (step) => {
    const { results } = this.state;
    let index = results.findIndex(result => result.active === true);

    index += step;
    if (index >= results.length) {
      index = 0;
    }
    if (index < 0) {
      index = Math.max(results.length - 1, 0);
    }

    const nextResults = results.map(result => ({ ...result, active: false }));
    nextResults[index].active = true;

    this.setState({ results: nextResults });
  }

  clearSearch = () => {
    this.setState({ value: null });
    this.exitSearch();
  }

  exitSearch = () => {
    this.setState({
      clearButtonVisible: false,
      hint: false,
      loading: false,
      results: []
    });
  }
}
