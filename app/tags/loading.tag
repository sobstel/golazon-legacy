<loading>
  <div class="loading__container sloppy hpadding">
    <p class="loading__loader" if={ parent.loading }>loading</p>
    <p class="loading__error" if={ parent.error }>LOADING ERROR: { parent.error } (<a href="" onclick={ reload_page }>reload</a>)</p>
  </div>

  <script type="coffee">
    @reload_page = () ->
      location.reload()
  </script>

  <style type="text/scss">
    .loading {
      &__container {
        font-size: 13px;
      }

      &__loader {
        font-style: italic;

        &:after {
          overflow: hidden;
          display: inline-block;
          vertical-align: bottom;
          animation: ellipsis steps(4,end) 900ms infinite;
          content: "\2026"; /* ascii code for the ellipsis character */
          width: 0px;
        }
      }

      &__error {
        display: inline-block;
        color: #c33;
        font-weight: 400;
      }

      @keyframes ellipsis {
        to {
          width: 1.25em;
        }
      }
    }


  </style>
</loading>
