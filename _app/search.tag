<search>
  <header class="search__container block" role="banner">

    <div class="search__input-container">
      <input type="text"
        role="search"
        class="search__input"
        accesskey="s"
        name="q"
        placeholder="Search: country or tournament name"
        onkeyup={ search }
        onfocus={ search }>

      <button
        class="search__clear-button"
        onclick={ search_clear_click }
        if={ clear_button_visible }>
        X
      </button>
    </div>

    <div class="search__extras-container">
      <p class="search__hint" if={ results.length == 0 && (hint || loading) }>
        <span if={ loading } class="loader">loading</span>
        { hint }
      </p>

      <ul class="search__results" if={ results.length > 0 }>
        <li each={ results }>
          <a href="/#!/c/{ id }" class={ active: active } onclick={ search_result_click } onmouseover={ search_result_mouseover }>
            { name } ({ area_name }) <virtual if={ teamtype != 'default' }>{ teamtype }</virtual>
          </a>
        </li>
        <li class="search__results-hint" if={ results_hint }>
            { results_hint }
        </li>
        <li class="search__loader loader" if={ loading }>
            loading more
        </li>
      </ul>
    </div>
  </header>

  <style type="scss">
    @import 'app/support.scss';

    $search-border-color: #ccc;
    $search-horizontal-padding: 8px;

    .search {
      &__input-container {
        display: flex;
      }

      &__input {
        font-size: 16px;
        border: 1px solid $search-border-color;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

        border-radius: 0;
        color: $input-text-color;
        padding: 8px $search-horizontal-padding;
        width: 100%;

        &:focus {
          outline: none;
        }

        // experimental: prevent special behaviour for iphone (auto-zoom on focus and inner box shadow)
        @media screen and (-webkit-min-device-pixel-ratio: 0) and (max-device-width: 480px) {
          font-size: 16px;
          -webkit-appearance: none;
        }
      }

      &__clear-button {
        display: inline-block;
        width: 30px;
        padding: 0;
        margin-left: -1px;
        border: 1px solid $search-border-color;
        border-left: none;
        color: #000;
        background: #fff;
        text-transform: lowercase;
        outline: none;
        font-weight: 700;
        font-size: 15px;
        align-content: center;
        text-align: center;
      }

      &__extras-container {
        position: relative;
      }

      &__hint {
        padding-top: 3px;
        padding-left: $default-padding;
        margin-bottom: -4px;
        font-size: 11px;
      }

      &__results {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;

        border: 1px solid $search-border-color;
        border-width: 0 1px;
        background: #fcfcfc;

        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

        min-width: $min-width - (2 * $default-padding);

        a {
          display: block;
          padding: 5px $search-horizontal-padding;
          border: none;

          &.active {
            background: $hover-color;
          }
          &:hover {
            text-decoration: none;
          }

          font-size: 15px;

          @media screen and (min-width: $max-width) {
            font-size: 14px;
          }
        }
      }

      &__results-hint,
      &__loader {
        padding: 5px $search-horizontal-padding;
        font-style: italic;
        font-size: 13px;
      }
    }
  </style>
</search>
