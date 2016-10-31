<app-footer>
  <div class="footer__wrapper">
    <footer class="footer__container block hpadding">
      <ul class="footer__nav">
        <li>This is an open source prototype.</li>
        <li><a href="/#/wtf">WTF?</a></li>
      </ul>
    </footer>
  </div>

  <script type="coffee">
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
          font-style: italic;
        }
      }
    }
  </style>
</app-footer>
