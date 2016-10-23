<app>
  <app-header></app-header>

  <div class="page__container">
    <div id="main" class="page__content"></div>
  </div>

  <script type="coffee">
    riot.route.base '/'

    riot.route '/', () ->
      riot.mount '#main', 'home'

    riot.route '/c/*', (competition_id) ->
      riot.mount '#main', 'competition', competition_id: competition_id

    riot.route '/wtf', () ->
      riot.mount '#main', 'wtf'

    riot.route () ->
      riot.mount '#main', 'error404'
      console.log 'not found'

    riot.route.start true
  </script>

  <style type="scss">
    @import 'app/support.scss';

    .page__container {
      @include container();
    }
    .page__content {
      padding: 10px 0;
    }
  </style>
</app>
