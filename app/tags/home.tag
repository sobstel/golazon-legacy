<home>
  <div class="home__wrapper block wrapped">
    <loading></loading>
    <matches matches={ matches } if={ matches }></matches>
  </div>

  <script type="coffee">
    util = require 'util'

    @on 'mount', () =>
      util.request @, '/matches/live', (matches) =>
        @matches = matches
        @update()
  </script>

  <style type="scss">
    @import 'app/support.scss';

  </style>
</home>
