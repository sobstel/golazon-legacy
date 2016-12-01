<match>

    <h1 class="match__title">
      <loading></loading>
      { title }
    </h1>


    <div class="match__container" if={ match }>
      <div class="match__goals block wrapped" if={ match.goals.length > 0 }>
        <strong>Goals:</strong>
        <span each={ match.goals }>{ name } { min }' ({ score[0] }:{ score[1] })</span>
      </div>

      <div class="block wrapped">
        <p class="match__players" if={ match.home_players.length > 0 }>
          <strong>{ match.home_name }:</strong>
          <span each={ match.home_players } class={ in: this.in }><virtual if={ this.in }>{ this.in }'</virtual> { name }</span>
        </p>
        <div class="match__players" if={ match.away_players.length > 0 }>
          <strong>{ match.away_name }:</strong>
          <span each={ match.away_players } class={ in: this.in }><virtual if={ this.in }>{ this.in }'</virtual> { name }</span>
        </div>
      </div>

      <div class="match__cards block wrapped" if={ match.cards.length > 0 }>
        <strong>Cards:</strong>
        <span each={ match.cards }>{ name } { min }' ({ code })</span>
      </div>
    </div>
  </div>

  <script type="coffee">
    util = require 'util'

    @format_date = util.format_date
    @format_time = util.format_time

    @on 'mount', () =>
      @update()

      util.request @, '/matches/' + opts.match_id, (match) =>
        @match = match

        @title = util.format_date(match.date, match.time) + ': ' +
          match.home_name + ' ' + match.ft[0] + ' : ' + match.ft[1] + ' ' + match.away_name

        @update()

        util.title @title
  </script>

  <style type="text/scss">
    @import 'app/support.scss';

    .match {
      &__container {
        span:first-child .separator {
          display: none;
        }
      }

      &__goals span,
      &__cards span {
        &:after {
          content: ', ';
        }

        &:last-child:after {
          content: none;
        }
      }

      &__players {
        strong + span {
          &:before {
            content: none;
          }
        }
        span {
          &:before {
            content: ', ';
          }

          &.in {
            &:before {
              content: ' (';
            }
            &:after {
              content: ')';
            }
          }
        }
      }
    }
  </style>
</match>
