import { request, setSiteTitle } from '../lib/util';

export default {
  fetchData(state, actions, { competitionId }) {
    return update => {
      // fetch competition info
      request(`/competitions/${competitionId}`, competition => {
        if (!competition) {
          update({
            competition: {},
            title: 'Competition not found'
          });

          return ;
        }

        let title = `${competition.name} ${competition.season.name} (${competition.area_name})`;
        if (competition.teamtype !== 'default') {
          title += ` ${competition.teamtype}`;
        }

        update({ competition, title });

        const seasonId = competition.season['season_id'];

        actions.competition.fetchPastMatches({ seasonId });
        actions.competition.fetchFutureMatches({ seasonId });
        actions.competition.fetchStandings({ seasonId });
      });
    };
  },

  fetchPastMatches(state, actions, { seasonId, limit = 10 }) {
    // TODO: load into competition state
    console.log('fetchPastMatches', seasonId, limit);
    return {};
  },

  fetchFutureMatches(state, actions, { seasonId, limit = 10 }) {
    // TODO: load into competition state
    console.log('fetchFutureMatches', seasonId, limit);
    return {};
  },

  fetchStandings(state, actions, { seasonId }) {
    // TODO: load into competition state
    console.log('fetchStandings', seasonId);
    return {};
  },
};
