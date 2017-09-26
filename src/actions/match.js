import { request } from '../lib/util';

export default {
  fetchData(state, actions, { matchId }) {
    return (update) => {
      request(`/matches/${matchId}`, (match) => {
        if (!match) {
          // TODO
          return;
        }

        let title = `${match['home_name']} v ${match['away_name']}`;
        title += ` - ${match['competition_name']} - ${match['area_name']}`;

        update({
          match: { ...match, title },
          siteTitle: title,
        });

        // TODO
        // if (match.live) { return timeout = setTimeout(refresh_data, 30 * 1000); }
      });
    };
  },
};
