<home>
  <div class="home__wrapper block sloppy hpadding">
  <matches matches={ matches } if={ matches }></matches>

  <script type="coffee">
    util = require 'util'

    @on 'mount', () =>
      util.request @, '/matches/live', (matches) =>
        @matches = matches
        @update()
  </script>

  <style type="scss">
    @import 'app/support.scss';

    .home {
      &__item {
        line-height: 2em;
        font-size: 15px;

        @media screen and (min-width: $big-screen-width) {
          font-size: 14px;
        }
      }
    }
  </style>
</home>
