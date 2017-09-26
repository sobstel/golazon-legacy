<home>
  <div class="home__wrapper block wrapped">
    <loading />
    <div each={ item in grouped_matches }>
      <h2>
        <a href="#!/c/{ item.competition.id }" onclick={ go_to_competition }>
          { item.competition.name } ({ item.competition.area_name })
          <virtual if={ teamtype != 'default' }>{ teamtype }</virtual>
        </a>
      </h2>
      <matches matches={ item.matches }></matches>
    </div>
    <p if={ grouped_matches.length == 0 }><em>No live matches at the moment.</em></p>
  </div>
</home>
