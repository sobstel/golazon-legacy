<wtf>
  <div class="wtd__container hpadding">
    <h1>WTF?</h1>
    <p>
      Football data <a href="https://gist.github.com/sobstel/bb52784b857697b71f60ed2f040e9757">mnmlist</a> way.
    </p>
    <p>
      <a href="https://github.com/sobstel/golazon">Open source</a> prototype built as a proof of concept.
    </p>
    <p>
      Drop me a line if you feel like helping or funding this project to grow ;-)
    </p>
    <p>
      przemek@<a href="http://www.sobstel.org/">sobstel.org</a>
    </p>
  </div>

  <script type="coffee">
    util = require 'util'

    this.on 'mount', () =>
      util.title 'WTF'
  </script>

  <style type="scss">
    @import 'app/support.scss';

    .wtf {
      &__container {
        font-size: 13px;
      }
    }

  </style>
</wtf>
