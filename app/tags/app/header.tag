<app-header>
  <div class="header__wrapper">
    <header class="header__container block hpadding">
      <a href="/" class="header__logo"></a>

      <form role="search" class="header__search" onsubmit={ search_submit }>
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
          <a href="/#/c/{ id }" class={ active: active } onclick={ search_result_click } onmouseover={ search_result_mouseover }>
            { name } ({ area_name }) <span if={ teamtype != 'default' }>{ teamtype }</span>
          </a>
        </li>
      </ul>
    </header>
  </div>

  <script type="coffee">
    util = require 'util'
    active_result_index = -1

    active_result = (index) =>
      index = 0 if index >= this.results.length
      index = this.results.length - 1 if index < 0

      this.results[active_result_index].active = false if active_result_index >= 0

      this.results[index].active = true
      active_result_index = index

      this.update()

    exit_search = () =>
      this.results = []
      this.update()

    this.search_submit = (e) =>
      false

    this.search = (e) =>
      text = e.target.value

      if e.keyCode == 40 # down arrow
        active_result(active_result_index + 1 )

      else if e.keyCode == 38 # up arrow
        active_result(active_result_index - 1)

      else if e.keyCode == 27 # esc
        exit_search()

      else if e.keyCode == 13 # enter
        # SMELL: hardcoded url to competition
        riot.route '/c/' + this.results[active_result_index].id if active_result_index >= 0
        exit_search()

      else if text.length >= 4
        util.request '/search?q=' + text, (results) =>
          this.results = results
          this.update()

    this.search_result_mouseover = (e) =>
      index = this.results.map((result) -> result.id).indexOf(e.item.id)
      active_result(index)

    this.search_result_click = (e) =>
      exit_search()
      true
  </script>

  <style type="scss">
    @import 'app/support.scss';

    $logo-size: 35px;
    $search-horizontal-padding: 8px;
    $active-color: #f6f6f6;

    .header {
      &__wrapper {
        background-color: $header-bg-color;
        border-bottom: 1px solid $header-border-color;
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
          padding: 6px $search-horizontal-padding;
          width: 100%;
          max-width: ($big-screen-width - 20px);

          &:focus {
            outline: none;
            border: 1px solid $search-border-focus-color;
          }

          // experimental: prevent special behaviour for iphone (auto-zoom on focus and inner box shadow)
          @media screen and (-webkit-min-device-pixel-ratio: 0) and (max-device-width: 480px) {
            font-size: 16px;
            -webkit-appearance: none;
          }
        }
      }

      &__search-results {
        position: absolute;
        left: $horizontal-padding;
        right: $horizontal-padding;

        border: 1px solid $search-border-color;
        border-width: 0 1px;
        background: #fff;

        min-width: $min-width - (2 * $horizontal-padding);
        max-width: ($big-screen-width - 20px);

        li {

          border-bottom: 1px solid $search-border-color;
        }
        a {
          display: block;
          padding: 7px $search-horizontal-padding;

          &.active {
            text-decoration: none;
            background: $active-color;
          }
        }

        @media screen and (min-width: ($max-width + 2 * $horizontal-padding)) {
          left: 0;
          right: 0;
        }
      }
    }
  </style>
</app-header>
