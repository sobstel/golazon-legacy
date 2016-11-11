<app>
  <home if={ home }></home>

  <virtual if={ !home }>
    <div class="app__container">
      <search></search>

      <div class="app__content block">
        <div id="main"></div>
      </div>
    </div>

    <app-footer></app-footer>
  </virtual>

  <script type="coffee">
    @home = false

    home = (enable = true) =>
      @home = enable
      @update()

    riot.route.base '#!'

    riot.route '/', () =>
      home(true)
      riot.mount 'home'

    riot.route '/s', () =>
      home(false)
      # SMELL: any way to do it more react way? (or using observer?)
      document.querySelector('.search__input').focus()

    riot.route '/c/*', (competition_id) =>
      home(false)
      riot.mount '#main', 'competition', competition_id: competition_id

    riot.route '/wtf', () =>
      home(false)
      riot.mount '#main', 'wtf'

    riot.route () =>
      home(false)
      riot.mount '#main', 'error404'

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
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
  </style>
</app>
