<app-header>
  <div class="header__wrapper">
    <header class="header__container block hpadding">
      <a href="/" class="header__logo"></a>

      <form role="search" class="header__search">
        <input type="text"
          class="header__search__input"
          data-hotkey="s"
          name="q"
          placeholder="Search Golazon"
          onkeyup={ search }
          onfocus={ search }>
      </form>

      <ul class="header__search-results" if={ results.length > 0 }>
        <li each={ results }>
          <a href="/#/c/{ id }" onclick={ search_result_click }>{ name } ({ area_name }) <span if={ teamtype != 'default' }>{ teamtype }</span></a>
        </li>
      </ul>
    </header>
  </div>

  <script type="coffee">
    util = require 'util'

    this.search = (e) =>
      text = e.target.value
      if text.length > 4
        util.request '/search?q=' + text, (results) =>
          this.results = results
          this.update()

    this.search_result_click = (e) =>
      this.results = []
      this.update()
      true
  </script>

  <style type="scss">
    @import 'app/support.scss';

    $logo-size: 35px;

    .header {
      &__wrapper {
        background-color: $header-bg-color;
        border-bottom: 1px solid $header-border-color;
        font-size: $header-font-size;
      }

      &__container {
        position: relative;
        padding-top: 10px;
        padding-bottom: 10px;
      }

      &__logo {
        display: none;

        @media (min-width: ($max-width + $logo-size * 2 + 20px)) {
          float: left;
          display: inline-block;
          margin-left: -($logo-size + 10px);
          width: $logo-size;
          height: $logo-size;
          background-image: url($logo-svg);
          background-size: contain;
        }
      }

      &__search {
        overflow: auto;

        &__input {
          border: 1px solid $search-border-color;
          color: $footer-text-color;
          padding: 6px 8px;
          width: 100%;
          max-width: ($big-screen-width - 20px);
          font-size: $search-input-font-size;

          // experimental: prevent input zoom for iphone
          @media screen and (-webkit-min-device-pixel-ratio: 0) and (max-device-width: 480px) {
            font-size: 16px;
            -webkit-appearance: none;
          }

          &:focus {
            outline: none;
            border: 1px solid $search-border-focus-color;
          }
        }
      }

      &__search-results {
        position: absolute;
        left: $horizontal-padding;
        right: $horizontal-padding;
        background: #fff;
        border: 1px solid $search-border-color;
        border-top: none;

        padding: 8px;

        min-width: $min-width - (2 * $horizontal-padding);
        max-width: ($big-screen-width - 20px);

        @media screen and (min-width: ($max-width + 2 * $horizontal-padding)) {
          left: 0;
          right: 0;
        }
      }
    }
  </style>
</app-header>
