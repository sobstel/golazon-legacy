<app>
  <search></search>

  <div id="main"></div>

  <p class="block nav" if={ links_visible }>
    <a href="/">live</a>
  </p>

  <p class="disclaimer block">
    Football data mnmlist way. Open source prototype.<br>
    (<a href="https://github.com/sobstel/golazon#readme">click here to learn more</a>)
  </p>

  <script type="coffee">
    util = require 'util'

    riot.route.base '#!'

    riot.route '/', () =>
      riot.mount '#main', 'home'
      util.beholder.trigger 'mount', 'home'

    riot.route '/c/*', (competition_id) =>
      riot.mount '#main', 'competition', competition_id: competition_id
      util.beholder.trigger 'mount', 'competition'

    riot.route '/m/*', (match_id) =>
      riot.mount '#main', 'match', match_id: match_id
      util.beholder.trigger 'mount', 'match'

    riot.route () =>
      riot.mount '#main', 'error404'
      util.beholder.trigger 'mount', 'error404'

    riot.route.start true

    @links_visible = false
    @update()

    util.beholder.on 'mount', (name) =>
      @links_visible = (name != 'home')
      @update()
  </script>

  <style type="scss">
    @import 'app/support.scss';

    .nav {
      margin-top: 1em;
      margin-bottom: 2em;
      text-align: center;

      a {
        color: #c66;
      }
    }

    .disclaimer {
      margin-top: 1em;
      margin-bottom: 2em;
      font-style: italic;
      padding: 0 $default-padding;
      font-size: 12px;
      text-align: center;

      a {
        border-bottom: 1px dotted #666;
        text-decoration: none;
      }
    }
  </style>
</app>
