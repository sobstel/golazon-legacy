<app-header>
  <div class="header__wrapper">
    <header class="header__container block hpadding">
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

    .header {
      &__wrapper {
        background-color: $header-bg-color;
        border-bottom: 1px solid $header-border-color;
        font-size: $header-font-size;
      }

      &__container {
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
        visibility: hidden;
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
            border: 1px solid $search-border-focus-color;
          }
        }
      }
    }
  </style>
</app-header>
