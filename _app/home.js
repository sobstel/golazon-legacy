/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
    let item;
    const util = require('util');
    const history = require('history');

    util.title('Live');

    let timeout = null;

    var refresh_data = () => {
      return util.request(this, '/matches/live', matches => {
        let key;
        const competition_matches = {};

        for (let match of Array.from(matches)) {
          key = match['competition_id'];

          if (!competition_matches[key]) { competition_matches[key] = {
            competition: {
              id: match['competition_id'],
              name: match['competition_name'],
              area_name: match['area_name'],
            },
            matches: []
          }; }

          competition_matches[key]['matches'].push(match);
        }

        const grouped_matches = [];
        for (key in competition_matches) { item = competition_matches[key]; grouped_matches.push(item); }

        grouped_matches.sort(function(a, b) {
          let ha = history.get('competition', a.competition.id);
          let hb = history.get('competition', b.competition.id);
          if (!ha) { ha = { '_score': {'count': 0} }; }
          if (!hb) { hb = { '_score': {'count': 0} }; }
          return hb['_score']['count'] - ha['_score']['count'];});

        this.grouped_matches = grouped_matches;
        if (!this.grouped_matches || !(this.grouped_matches.length > 0)) { this.suggested_competitions = history.getAll(20); }

        this.update();

        return timeout = setTimeout(refresh_data, 30 * 1000);
      });
    };

    this.on('mount', () => {
      return refresh_data();
    });

    this.on('unmount', () => {
      if (timeout) { return clearTimeout(timeout); }
    });

    this.go_to_competition = function(e) {
      const competition_id = e.item.item.competition.id;
      const history_item = history.get('competition', competition_id);
      if (history_item) { history.update(history_item); }
      return riot.route(`/c/${competition_id}`);
    };
