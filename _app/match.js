/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
    const util = require('util');

    this.format_date = util.format_date;
    this.format_time = util.format_time;

    let timeout = null;

    var refresh_data = () => {
      return util.request(this, `/matches/${opts.match_id}`, match => {
        this.match = match;

        this.title = match.home_name + ' v ' + match.away_name + ' - ' + match.competition_name + ' - ' + match.area_name;

        this.update();

        util.title(this.title);

        if (match.live) { return timeout = setTimeout(refresh_data, 30 * 1000); }
      });
    };

    this.on('mount', () => {
      return refresh_data();
    });

    this.on('unmount', () => {
      if (timeout) { return clearTimeout(timeout); }
    });
