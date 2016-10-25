<app-footer>
  <footer class="footer__wrap">
    <div class="footer__container">
      <div class="footer__nav">
        <ul>
          <li>This is just a mere prototype.</li>
          <li><a href="/wtf">WTF?</a></li>
        </ul>
      </div>
    </div>
  </footer>

  <script type="coffee">
  </script>

  <style type="scss">
    @import 'app/support.scss';

    app-footer {
      display: block;
    }

    .footer__wrap {
      border-top: 1px solid $border-gray;
      height: $footer-height;
      background-color: $bg-gray;
    }

    .footer__container {
      @include container();
    }

    .footer__nav {
      @include column();

      ul {
        margin-left: 10px;
      }
      li {
        display: inline;
        line-height: $footer-height;
        font-size: 12px;
        font-style: italic;
      }
    }
  </style>
</app-footer>
