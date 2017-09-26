/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
    const util = require('util');

    this.type = opts.type;
    this.past_type = (this.type === 'past');
    this.future_type = (this.type === 'future');

    this.show_more_nav = true;
    this.update();

    let limit = 10;

    this.on('mount', () => {
      return load_matches();
    });

    this.on_more = e => {
      limit += 10;
      if (limit >= 50) {
        limit = 50;
        this.show_more_nav = false;
        this.update;
      }

      return load_matches();
    };

    var load_matches = () => {
      const { season_id } = this.parent.competition.season;

      return util.request(this, `/season/${season_id}/matches/${this.type}/${limit}`, matches => {
        this.matches = matches;
        if (matches < limit) { this.show_more_nav = false; }
        return this.update();
      });
    };
