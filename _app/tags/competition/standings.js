/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
    const util = require('util');

    this.on('mount', () => {
      const { season_id } = this.parent.competition.season;

      return util.request(this, `/season/${season_id}/standings`, rounds => {
        this.rounds = rounds;
        return this.update();
      });
    });

    this.zone_class = zone => {
      if (!zone) { return ''; }
      return (`zone zone-${zone}`);
    };
