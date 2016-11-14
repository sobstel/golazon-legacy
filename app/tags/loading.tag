<loading>
  <div class="loading__container sloppy hpadding">
    <p class="loading__loader loader" if={ parent.loading }>loading</p>
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

      &__error {
        display: inline-block;
        color: #c33;
        font-weight: 400;
      }
    }
  </style>
</loading>
