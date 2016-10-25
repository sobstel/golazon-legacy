<app-header>
  <header class="header__wrap">
    <div class="header__container">
      <a href="/" class="header__logo"></a>

      <form role="search" class="header__search">
        <input type="text"
          class="header__search__input"
          data-hotkey="s"
          name="q"
          placeholder="Type country or competition name">
      </form>
    </div>
  </header>

  <script type="coffee">
  </script>

  <style type="scss">
    @import 'app/support.scss';

    $nav-height: 44px;

    .header__wrap {
      background-color: $bg-gray;
      border-bottom: 1px solid $border-gray;
    }

    .header__container {
      @include container();
      @include clearfix();

      padding-top: 6px;
      padding-bottom: 6px;
    }

    .header__logo {
      float: left;
      margin-left: -2px;
      margin-right: 10px;
      display: inline-block;
      width: $nav-height;
      height: $nav-height;
      background-image: url($logo-svg);
      background-size: contain;
    }

    .header__search {
      overflow: auto;
      padding: 4px 0;
      max-width: 400px;

      &__input {
        border-radius: $border-radius;
        border: 1px solid $border-gray-dark;
        line-height: 20px;
        min-height: ($nav-height - 8px);
        color: $gray-dark;
        padding: 6px 8px;
        width: 100%;

        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          font-size: 16px;
        }

        &:focus {
          outline: none;
          border: 1px solid $border-orange;
        }
      }
    }
  </style>
</app-header>
