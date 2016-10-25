<app>
  <div class="page__wrap">
    <app-header></app-header>

    <div class="page__content">
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

    .page__wrap {
      min-height: 100%;
      margin-bottom: -$footer-height;
    }
    .page__wrap:after {
      content: "";
      display: block;
      height: $footer-height;
    }

    .page__content {
      @include container();
      padding-top: 20px;
      padding-bottom: 20px;
    }
  </style>
</app>
