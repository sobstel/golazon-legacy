<app-header>
  <div class="header__wrapper">
    <header class="header__container">
      <a href="/" class="header__logo"></a>

      <form role="search" class="header__search">
        <input type="text"
          class="header__search__input"
          data-hotkey="s"
          name="q"
          placeholder="Search Golazon">
      </form>
    </header>
  </div>

  <script type="coffee">
  </script>

  <style type="scss">
    @import 'app/support.scss';

    $logo-size: 35px;

    .header__wrapper {
      background-color: $header-bg-color;
      border-bottom: 1px solid $header-border-color;
      font-size: $header-font-size;
    }

    .header__container {
      @include block-layout();
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .header__logo {
      display: none;
    }

    @media (min-width: ($big-screen-width + $logo-size * 2 + 20px)) {
      .header__logo {
        float: left;
        margin-left: -($logo-size + 12px);
        display: inline-block;
        width: $logo-size;
        height: $logo-size;
        background-image: url($logo-svg);
        background-size: contain;
      }
    }

    .header__search {
      overflow: auto;
      margin-left: -1px;

      &__input {
        border: 1px solid $search-border-color;
        color: $footer-text-color;
        padding: 6px 8px;
        width: 100%;
        max-width: ($big-screen-width - 20px);
        font-size: $search-input-font-size;

        &:focus {
          outline: none;
          border: 1px solid $action-color;
        }
      }
    }
  </style>
</app-header>
