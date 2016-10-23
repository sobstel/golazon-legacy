<app-header>
  <header class="header__wrapper">
    <div class="header__container">
      <div class="header__main">
        <a href="/" class="header__logo"></a>

        <form role="search" class="header__search">
          <input type="text"
            class="header__search__input"
            data-hotkey="s"
            name="q"
            placeholder="Search for competition"
            aria-label="Search for competition"
            autocapitalize="words">
        </form>
      </div>
      <div class="header__nav">
        <ul>
          <li><a href="/wtf">WTF?</a></li>
        </ul>
      </div>
    </div>
  </header>

  <script type="coffee">
  </script>

  <style type="scss">
    @import 'app/support.scss';

    $nav-height: 44px;

    .header__wrapper {
      padding: 10px 0;
      background-color: $bg-gray;
      border-bottom: 1px solid $border-gray;
    }

    .header__container {
      @include container();
      @include clearfix();
    }

    .header__main {
      @include column();
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
      margin: 6px 0;

      &__input {
        border-radius: $border-radius;
        border: 1px solid $border-gray-dark;
        line-height: 20px;
        min-height: 34px;
        color: $gray-dark;
        padding: 6px 8px;
        width: 100%;
      }
    }

    .header__nav {
      @include column();
      line-height: $nav-height;

      ul {
        margin-left: 10px;
      }
      a {
        text-decoration: none;
        font-weight: 600;
        color: #333;
      }
    }
  </style>
</app-header>
