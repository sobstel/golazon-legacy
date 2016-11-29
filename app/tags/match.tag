<match>
  <loading></loading>
  <h1 class="match__title sloppy hpadding">{ title }</h1>

  <div class="match__container" if={ match }>
    <div class="match__goals hpadding sloppy" if={ match.goals.length > 0 }>
      <strong>Goals:</strong>
      <span each={ match.goals }>{ name } { min }' ({ score[0] }:{ score[1] })</span>
    </div>

    <div class="match__players hpadding sloppy" if={ match.home_players.length > 0 }>
      <strong>{ match.home_name }:</strong>
      <span each={ match.home_players } class={ in: this.in }><virtual if={ this.in }>{ this.in }'</virtual> { name }</span>
    </div>

    <div class="match__players hpadding sloppy" if={ match.away_players.length > 0 }>
      <strong>{ match.away_name }:</strong>
      <span each={ match.away_players } class={ in: this.in }><virtual if={ this.in }>{ this.in }'</virtual> { name }</span>
    </div>

    <div class="match__cards hpadding sloppy" if={ match.cards.length > 0 }>
      <strong>Cards:</strong>
      <span each={ match.cards }>{ name } { min }' ({ code })</span>
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

        div {
          margin: 0;
          padding: 0.5em 2em;
          background: #f9f9f9;
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
