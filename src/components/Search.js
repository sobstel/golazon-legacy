import { h } from 'hyperapp';

// main layout
export default ({ actions, clearButtonVisible, hint, loading, results, resultsHint, value }) => (
  <header class="search__container block" role="banner">
    <div class="search__input-container" role="search">
      <input
        type="text"
        class="search__input"
        name="q"
        placeholder="Search: country or tournament name"
        onkeyup={actions.search.search}
        onfocus={actions.search.search}
        value={value}
      />

      {clearButtonVisible &&
        <button
          class="search__clear-button"
          onclick={actions.search.onSearchClearClick}
        >
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
