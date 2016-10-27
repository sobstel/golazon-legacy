<app>
  <div class="app__container">
    <app-header></app-header>

    <div class="app__content block">
      <div id="main"></div>
    </div>
  </div>

  <app-footer></app-footer>

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

    .app {
      &__container {
        min-height: 100%;
        margin-bottom: -$footer-height;
      }

      &__container:after {
        content: "";
        display: block;
        height: $footer-height;
      }

      &__content {
        font-size: $content-font-size;

        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
  </style>
</app>
