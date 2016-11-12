<search>
  <div class="search__wrapper">
    <header class="search__container block sticky hpadding" role="banner">

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
          <span if={ loading }>loading...</span>
          { hint }
        </p>

        <ul class="search__results" if={ results.length > 0 }>
          <li each={ results } if={ results.length > 0 }>
            <a href="/#!/c/{ id }" class={ active: active } onclick={ search_result_click } onmouseover={ search_result_mouseover }>
              { name } ({ area_name }) <span if={ teamtype != 'default' }>{ teamtype }</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  </div>

  <script type="coffee">
    util = require 'util'
    history = require 'history'

    active_result_index = -1
    req = delay = null
    @results = []

    @clear_button_visible = false

    active_result = (index) =>
      index = 0 if index >= @results.length
      index = @results.length - 1 if index < 0

      result.active = false for result in @results

      @results[index].active = true
      active_result_index = index

      @update()

    reset_search_results = () =>
      active_result_index = -1
      # TODO: history.getAll(limit)
      @results = []
      @loading = false
      @update()

    exit_search = () =>
      reset_search_results()
      @hint = false
      @update()

    @search = (e) =>
      if opts.context == "home"
        riot.route '/s'
        return

      text = e.target.value
      @hint = false

      @clear_button_visible = (text.length > 0 ? true : false)

      if e.keyCode == 40 # down arrow
        active_result(active_result_index + 1)

      else if e.keyCode == 38 # up arrow
        active_result(active_result_index - 1)

      else if e.keyCode == 27 # esc
        exit_search()

      else if e.keyCode == 13 # enter
        # SMELL: hardcoded url to competition
        riot.route '/c/' + @results[active_result_index].id if active_result_index >= 0
        exit_search()

      else
        util.terminate_delay(delay) if delay
        req.abort() if req

        if text.length == 0
          @results = history.getAll(10)
          @update()
          return

        if text.length < 4
          @hint = 'min 4 letters' if text.length > 0
          reset_search_results()
          return

        @loading = true
        @update()

        delay = util.delay 0.2, =>
          req = util.request @, '/search?q=' + text, (results) =>
            @results = results
            @hint = 'no results found' if results.length == 0
            @update()

    @search_result_mouseover = (e) =>
      active_result((result.id for result in @results).indexOf(e.item.id))

    @search_result_click = (e) =>
      history.update @results[active_result_index] if active_result_index >= 0
      exit_search()
      true

    @search_clear_click = (e) =>
      exit_search()
      # SMELL: any way to do it more react way? (or using observer?)
      document.querySelector('.search__input').value = ''
      @clear_button_visible = false
      @update()
  </script>

  <style type="scss">
    @import 'app/support.scss';

    $search-horizontal-padding: 8px;

    .search {
      &__wrapper {
        background-color: $secondary-bg-color;
        width: 100%;
      }

      &__container {
        padding-top: 12px;
        padding-bottom: 12px;
      }

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
        max-width: $search-max-width;

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
        margin-left: -30px;
        width: 30px;
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
        padding-left: 10px;
        margin-bottom: -4px;
        font-size: 11px;
      }

      &__results {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;

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
            background:  #f6f6f6;
          }
          &:hover {
            text-decoration: none;
          }
        }
      }
    }
  </style>
</search>
