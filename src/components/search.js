import { h, Component } from 'preact';

export default class Search extends Component {
  render () {
    const value = null;
    const clearButtonVisible = null;
    const results = [];
    const hint = null;
    const loading = null;
    const resultsHint = null;

    return (
      <header class="search__container block" role="banner">
        <div class="search__input-container" role="search">
          <input
            type="text"
            class="search__input"
            name="q"
            placeholder="Search: country or tournament name"
            onkeyup={this.search}
            onfocus={this.search}
            value={value} />

          {clearButtonVisible &&
            <button
              class="search__clear-button"
              onclick={this.onSearchClearClick}>
              X
            </button>
          }
        </div>
        <div class="search__extras-container">
          {results.length === 0 && (hint || loading) &&
            <p class="search__hint">
              {loading && <span class="loader">loading</span>}
              {hint}
            </p>
          }

          <ul class="search__results">
            {results.map(result => (
              <li>
                <a
                  href={`/c/${result.id}`}
                  onclick={actions.search.onSearchResultClick}
                  class={result.active && 'active'}
                >
                  {result.name} ({result['area_name']}) {result.teamtype !== 'default' && result.teamtype}
                </a>
              </li>
            ))}
            {resultsHint &&
              <li class="search__results-hint">
                {resultsHint }
              </li>
            }
            {loading &&
              <li class="search__loader loader">
                loading more
              </li>
            }
          </ul>
        </div>
      </header>
    );
  }

  search (e) {
    console.log('search', e);
  }

  onSearchClearClick (e) {
    console.log('onSearchClearClick', e);
  }
}
