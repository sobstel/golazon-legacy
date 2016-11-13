<home>
  <div class="home__wrapper block sloppy hpadding">
  <ul>
    <li class="home__item" each={ results }>
      <a href="/#!/c/{ id }">{ name } ({ area_name })</a>
    </li>
  </ul>

  <script type="coffee">
    history = require 'history'

    @results = history.getAll(100).sort (a, b) -> a.name.localeCompare(b.name)
  </script>

  <style type="scss">
    @import 'app/support.scss';

    .home {
      &__item {
        line-height: 2;
      }
    }
  </style>
</home>
