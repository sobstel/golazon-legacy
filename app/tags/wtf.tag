<wtf>
  <div  class="hpadding">
    <h1>WTF?</h1>
    <p>
      Football data <a href="https://gist.github.com/sobstel/bb52784b857697b71f60ed2f040e9757">mnmlist</a> way.
    </p>
    <p>
      Golazon an <a href="https://github.com/sobstel/golazon">open source</a> prototype built as a proof of concept.
      Things may break. You have been warned.
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

  </style>
</wtf>
