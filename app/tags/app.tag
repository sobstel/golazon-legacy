<app>
  <search></search>
  <div id="main"></div>

  <script type="coffee">
    riot = require 'riot'

    riot.route.base '/'

    riot.route '/', () ->
      # mount home
      riot.mount '#main', 'splash'
      console.log 'home'

    riot.route '/c/*', (id) ->
      console.log 'competition: ' + id

    riot.route () ->
      riot.mount '#main', 'error404'
      console.log 'not found'

    riot.route.start true
  </script>
</app>
