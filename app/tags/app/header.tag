<app-header>
  <header>
    <div class="container clearfix">
      <div class="box">
        <a href="/" class="logo"></a>

        <form role="search">
          <input type="text" class="form-control" data-hotkey="s" name="q" placeholder="Search Golazon" aria-label="Search Golazon" autocapitalize="words">
        </form>
      </div>
      <div class="box nav">
        <ul>
          <li><a href="/wtf">WTF?</a></li>
        </ul>
      </div>
    </div>
  </header>

  <script type="coffee">
  </script>

  <style type="scss">
    @import 'app/variables.scss';

    header {
      padding: 10px 0;
      background-color: $bg-gray;
      border-bottom: 1px solid $border-gray;
    }

    .header--container {
      @include container();
    }

    .header--column {
      @include column(left);
    }

    header .box {
      float: left;
    }

    header .nav {
      line-height: 44px;

      ul {
        margin-left: 10px;
      }

      a {
        text-decoration: none;
        font-weight: 600;
        color: #333;
      }
    }


    header .logo {
      float: left;
      margin-left: -2px;
      margin-right: 10px;
      display: inline-block;
      width: 44px;
      height: 44px;
      background-image: url($logo-svg);
      background-size: contain;
    }
    header form {
      overflow: auto;
      margin: 6px 0;

      input.form-control {
        width: 99%;
      }
    }
  </style>
</app-header>
