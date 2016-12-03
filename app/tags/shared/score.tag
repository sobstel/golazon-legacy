<score>
  <span if={ match.fixture }>{ format_time(match.date, match.time) }</span>
  <span if={ match.live | match.ended } class={ live: match.live }>
    <virtual if={ !match.et || match.ps }>{ match.ft[0] }&nbsp;-&nbsp;{ match.ft[1] }</virtual>
    <virtual if={ match.et && !match.ps }>{ match.et[0] }&nbsp;-&nbsp;{ match.et[1] } aet</virtual>
    <virtual if={ match.ps }>p.{ match.ps[0] }-{ match.ps[1] }</virtual>
  </span>

  <script type="coffee">
    util = require 'util'

    @format_time = util.format_time
    @format_score = util.format_score

    @on 'mount', () =>
      @match = @opts.match
      @update()
  </script>

  <style type="scss">
    .live {
      color: #c33;
      animation: blinker 1s linear infinite;
    }

    @keyframes blinker {
      50% { opacity: 0.5; }
    }
  </style>
</score>
