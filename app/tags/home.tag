<home>
  <div class="home__wrapper block wrapped">
    <loading></loading>
    <div each={ key, item in competition_matches }>
      <h3><a href="#!/c/{ item.competition.id }">{ item.competition.name } ({ item.competition.area_name })</a></h3>
      <matches matches={ item.matches }></matches>
    </div>
    <p if={ !loading && !competition_matches }>No live matches at the moment.</p>
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

        @competition_matches = competition_matches
        @update()
  </script>

  <style type="scss">
    @import 'app/support.scss';

    .home {
      &__wrapper {
        loading + div h3 {
          margin-top: 0;
        }
      }
    }
  </style>
</home>
