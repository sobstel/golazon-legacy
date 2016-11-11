<home>
  <div class="home home__wrapper">
    <div class="home__container">
      <div class="home__logo" title="Golazon" alt="Golazon logo" onclick={ go_to_search }>
      </div>

      <search context="home"></search>

      <p><a href="/#!/wtf">WTF?</a></p>
    </div>
  </div>

  <!--
    <li><a href="/#!/c/04">Premier League</a></li>
    <li><a href="/#!/c/80">La Liga</a></li>
    <li><a href="/#!/c/rw">Serie A</a></li>
    <li><a href="/#!/c/1y">Bundesliga</a></li>
    <li><a href="/#!/c/97m">Primera División</a></li>
    <li><a href="/#!/c/2e0">Ekstraklasa</a></li>
    <li><a href="/#!/c/5d">Champions League</a></li>
  -->

  <script type="coffee">
    util = require 'util'

    @on 'mount', () =>
      util.title 'Golazon'


    @go_to_search = () ->
      riot.route '/s'
  </script>

  <style type="scss">
    @import 'app/support.scss';

    $logo-size: 128px;
    $margin: 20px;

    // logo + inside margins + search box + paragraph +  outside margins
    $container-height: $logo-size + 2 * $margin + 50px + 20px + 2 * $margin;

    .home {
      &__wrapper {
        min-height: 100%;
        background-color: $secondary-bg-color;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      &__container {
        height: 100%;
        min-height: $container-height;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex-wrap: nowrap;
      }

      &__logo {
        width: $logo-size;
        height: $logo-size;
        background: url($logo-svg) no-repeat;
        background-size: contain;
      }

      .search__container {
        flex-grow: 1;
        max-width: $search-max-width;
        margin: $margin 0;
      }

      p {
        margin-bottom: 0;
      }
    }
  </style>
</home>
