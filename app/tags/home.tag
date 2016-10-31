<home>
  <ul class="home-list hpadding">
    <li><a href="/#/c/04">Premier League</a></li>
    <li><a href="/#/c/80">La Liga</a></li>
    <li><a href="/#/c/rw">Serie A</a></li>
    <li><a href="/#/c/1y">Bundesliga</a></li>
    <li><a href="/#/c/97m">Primera División</a></li>
    <li><a href="/#/c/2e0">Ekstraklasa</a></li>
    <li><a href="/#/c/5d">Champions League</a></li>
  </ul>

  <script type="coffee">
    util = require 'util'

    this.on 'mount', () =>
      util.title 'Golazon'
  </script>

  <style type="scss">
    @import 'app/support.scss';

    .home-list {
      li a {
        display: inline-block;
        padding: 5px 0;
      }
    }
  </style>
</home>
