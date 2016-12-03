<home>
  <div class="home__wrapper block wrapped">
    <loading></loading>
    <div each={ item in grouped_matches }>
      <h2><a href="#!/c/{ item.competition.id }">{ item.competition.name } ({ item.competition.area_name })</a></h2>
      <matches matches={ item.matches }></matches>
    </div>
    <p if={ grouped_matches && grouped_matches.length == 0 }><em>No live matches at the moment.</em></p>
  </div>

  <script type="coffee">
    util = require 'util'

    @on 'mount', () =>
      util.request @, '/matches/live', (matches) =>
        competition_matches = {}

        for match in matches
          key = match['competition_id']

          competition_matches[key] ||= {
            competition: {
              id: match['competition_id'],
              name: match['competition_name'],
              area_name: match['area_name'],
            },
            matches: []
          }

          competition_matches[key]['matches'].push match

        grouped_matches = []
        grouped_matches.push item for key, item of competition_matches

        @grouped_matches = grouped_matches

        @update()
  </script>

  <style type="scss">
    @import 'app/support.scss';

  </style>
</home>
