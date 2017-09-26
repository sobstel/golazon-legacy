<competition-matches>
  <div class="{ type }-matches block wrapped" if={ matches.length > 0 }>
    <virtual if={ past_type }>
      <p class="matches nav" if={ show_more_nav }>
        <a href="" onclick={ on_more }>more</a>
      </p>
      <loading />
    </virtual>

    <matches matches={ matches } />

    <virtual if={ future_type }>
      <p class="matches nav" if={ show_more_nav }>
        <a href="" onclick={ on_more }>more</a>
      </p>
      <loading />
    </virtual>
  </div>
</competition-matches>
