<match>
  <p class="block nav">
    <a href="/">Golazon</a>
    <virtual if={ match }>» <a href="/#!/c/{ match.competition_id }">{ match.competition_name } ({ match.area_name })</a></virtual>
  </p>

  <h1 class="match__title block wrapped">
    <loading />
    <virtual if={ match }>{ match.home_name } - { match.away_name } <score match={ match }></score></virtual>
  </h1>

  <div class="match__container block wrapped" if={ match }>
    <p class="first">
      { format_date(match.date, match.time) }, { format_time(match.date, match.time) }
      <virtual if={ match.teamtype != 'default' }> · { match.teamtype }</virtual>
       · { match.round_name }
    </p>
    <div class="match__goals" if={ match.goals.length > 0 }>
      <h2 class="first">Goals</h2>
      <p><span each={ match.goals }>{ name } { min }' <virtual if={ code != 'G' }>[{ code }]</virtual> (<strong>{ score[0] }:{ score[1] }</strong>)</span></p>
    </div>
    <div class="match__penalty-shootout" if={ match.penalty_shootout.length > 0 }>
      <h2 class="first">Penalty shootout</h2>
      <p><span each={ match.penalty_shootout }>{ name } <virtual if={ code == 'M' }>(X)</virtual><virtual if={ code == 'G' }>({ score[0] }:{ score[1] })</virtual></span></p>
    </div>
    <div class="match__players" if={ match.home_players.length > 0 }>
      <h2>{ match.home_name } line-up ({ match.home_coach.name })</h2>
      <p><span each={ match.home_players } class={ in: this.in }><virtual if={ this.in }>{ this.in }'</virtual> { name }</span></p>
    </div>
    <div class="match__players" if={ match.away_players.length > 0 }>
      <h2>{ match.away_name } line-up ({ match.away_coach.name })</h2>
      <p><span each={ match.away_players } class={ in: this.in }><virtual if={ this.in }>{ this.in }'</virtual> { name }</span></p>
    </div>
    <div class="match__cards" if={ match.cards.length > 0 }>
      <h2>Cards</h2>
      <p><span each={ match.cards }>{ name } { min }' ({ code })</span></p>
    </div>
  </div>

  <script type="coffee">
    util = require 'util'

    @format_date = util.format_date
    @format_time = util.format_time

    timeout = null

    refresh_data = () =>
      util.request @, '/matches/' + opts.match_id, (match) =>
        @match = match

        @title = match.home_name + ' v ' + match.away_name + ' - ' + match.competition_name + ' - ' + match.area_name

        @update()

        util.title @title

        timeout = setTimeout(refresh_data, 30 * 1000) if match.live

    @on 'mount', () =>
      refresh_data()

    @on 'unmount', () =>
      clearTimeout(timeout) if timeout

  </script>

  <style type="text/scss">
    @import 'app/support.scss';

    .match {
      &__container {
        p {
          margin: 1em 0;
        }

        .first {
          margin-top: 0;
        }
      }

      &__goals span,
      &__cards span,
      &__penalty-shootout span
      {
        &:after {
          content: ', ';
        }

        &:last-child:after {
          content: none;
        }
      }

      &__players {
        span {
          &:first-child:before {
            content: none;
          }
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
