<app-footer>
  <div class="footer__wrapper">
    <footer class="footer__container block sloppy hpadding">
      <ul class="footer__nav">
        <li><a href onclick={ scrollTop }>Search</a></li>
        <li><a href="/">Popular</a></li>
        <li><a href="/#!/wtf">WTF?</a></li>
      </ul>
    </footer>
  </div>

  <script type="coffee">
    @scrollTop = (e) ->
      scroll 0,0
      # SMELL: possible to do more ract-way?
      document.querySelector('.header__search__input').focus()
  </script>

  <style type="scss">
    @import 'app/support.scss';

    .footer {
      &__wrapper {
        border-top: 1px solid $footer-border-color;
        height: $footer-height;
        background-color: $footer-bg-color;
      }

      &__nav {
        li {
          font-size: 12px;
          display: inline;
          margin-right: 10px;
          line-height: $footer-height;
          font-weight: 500;
          text-transform: uppercase;
        }
      }
    }
  </style>
</app-footer>
