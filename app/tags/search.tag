<search>
  <header class="search__container block" role="banner">

    <div class="search__input-container">
      <input type="text"
        role="search"
        class="search__input"
        accesskey="s"
        name="q"
        placeholder="Search Golazon"
        onkeyup={ search }
        onfocus={ search }>

      <button
        class="search__clear-button"
        onclick={ search_clear_click }
        if={ clear_button_visible }>
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
            { name } ({ area_name }) <span if={ teamtype != 'default' }>{ teamtype }</span>
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

  <script type="coffee">
    util = require 'util'
    history = require 'history'

    active_result_index = -1
    req = delay = null
    @results = []
    @clear_button_visible = false
    @hint = 'hint: type competition or country name'

    active_result = (index) =>
      index = 0 if index >= @results.length
      index = Math.max(@results.length - 1, 0) if index < 0

      result.active = false for result in @results

      @results[index].active = true
      active_result_index = index

      @update()

    reset_search_results = () =>
      active_result_index = -1
      @results = []
      @loading = false
      @clear_button_visible = false
      @update()

    exit_search = () =>
      reset_search_results()
      @hint = false
      @update()

    @search = (e) =>
      text = e.target.value

      @hint = false
      @clear_button_visible = true

      if e.keyCode == 40 && @results.length > 0 # down arrow
        active_result(active_result_index + 1)

      else if e.keyCode == 38 && @results.length > 0 # up arrow
        active_result(active_result_index - 1)

      else if e.keyCode == 27 # esc
        @search_clear_click()

      else if e.keyCode == 13 # enter
        # SMELL: hardcoded url to competition
        riot.route '/c/' + @results[active_result_index].id if active_result_index >= 0
        exit_search()

      else
        util.terminate_delay(delay) if delay
        req.abort() if req

        @results_hint = false

        if text.length == 0
          @loading = false
          @results = history.getAll(10)
          active_result(0)
          @update()
          return

        @results = history.search(text)

        if text.length < 4
          @results_hint = 'type 4 letters or more to search full database...'
          @update()
          return

        # show before delay
        @loading = true
        @update()

        delay = util.delay 0.2, =>
          req = util.request @, '/search?q=' + text, (results) =>
            # filter out results found in search history
            @results = @results.concat results.filter (result) =>
              @results.filter((r) -> (r.type == result.type && r.id == result.id)).length == 0
            @hint = 'no results found' if @results.length == 0
            @update()

    @search_result_mouseover = (e) =>
      active_result((result.id for result in @results).indexOf(e.item.id))

    @search_result_click = (e) =>
      history.update @results[active_result_index] if active_result_index >= 0
      exit_search()
      true

    @search_clear_click = (e) =>
      @q.value = ''
      @update()
      exit_search()

    @go_back = () =>
      reset_search_results()
      window.history.go(-1)

    @go_home = (e) =>
      reset_search_results()
      riot.route '/'
  </script>

  <style type="scss">
    @import 'app/support.scss';

    $search-horizontal-padding: 8px;

    .search {
      &__input-container {
        display: flex;
      }

      &__input {
        font-size: 16px;
        border: 1px solid $search-border-color;

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
        width: 30px;
        margin-left: -30px;
        border: 0;
        padding: 0;
        background: url($clear-svg) center center no-repeat;
        outline: none;
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
