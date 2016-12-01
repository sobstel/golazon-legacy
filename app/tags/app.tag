<app>
  <search></search>
  <div id="main"></div>

  <script type="coffee">
    riot.route.base '#!'

    riot.route '/', () =>
      riot.mount '#main', 'home'

    riot.route '/c/*', (competition_id) =>
      riot.mount '#main', 'competition', competition_id: competition_id

    riot.route '/m/*', (match_id) =>
      riot.mount '#main', 'match', match_id: match_id

    riot.route () =>
      riot.mount '#main', 'error404'

    riot.route.start true
  </script>

  <style type="scss">
    @import 'app/support.scss';

  </style>
</app>
