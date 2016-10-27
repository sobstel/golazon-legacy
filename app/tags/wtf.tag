<wtf>
  <div  class="hpadding">
    <h1>WTF?</h1>
    <p>
      Football data <a href="https://gist.github.com/sobstel/bb52784b857697b71f60ed2f040e9757">mnmlist</a> way.
    <p>
    <p>
      Golazon is <strong>a prototype</strong> built to test a concept.
      Things may break. You have been warned.
    </p>
    <p>
      Data API is proprietary yet it's prototype either. There's no proper infrastructure behind it
      and it's not ready nor optimized for even small traffic. Not for commercial use!
    </p>
    <p>
      Golazon is an <a href="https://github.com/sobstel/golazon">open source</a> project.
      <a href="https://github.com/sobstel/golazon/issues">Report a bug</a>
      or <a href="https://github.com/sobstel/golazon/pulls">fix yourself</a>.
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
