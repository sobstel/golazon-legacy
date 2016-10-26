<app-header>
  <header class="header__wrap">
    <div class="header__container">
      <a href="/" class="header__logo"></a>

      <form role="search" class="header__search">
        <input type="text"
          class="header__search__input"
          data-hotkey="s"
          name="q"
          placeholder="Search Golazon">
      </form>
    </div>
  </header>

  <script type="coffee">
  </script>

  <style type="scss">
    @import 'app/support.scss';

    $logo-size: 35px;

    .header__wrap {
      background-color: $bg-gray;
      border-bottom: 1px solid $border-gray;
    }

    .header__container {
      @include container();
      @include container-padding();
      overflow: visible;

      padding-top: 10px;
      padding-bottom: 10px;
    }

    .header__logo {
      display: none;
    }

    @media (min-width: ($max-container-size + $logo-size * 2 + 20px)) {
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
      max-width: ($max-container-size - 250px);
      margin-left: -1px;

      &__input {
        border: 1px solid $border-gray-dark;
        color: $gray-dark;
        padding: 6px 8px;
        width: 100%;

        &:focus {
          outline: none;
          border: 1px solid $border-orange;
        }
      }
    }
  </style>
</app-header>
