import { request } from '../lib/util';

export default {
  fetchData(state, actions, { competitionId }) {
    return (update) => {
      // fetch competition info
      request(`/competitions/${competitionId}`, (competition) => {
        if (!competition) {
          update({
            competition: {},
            title: 'Competition not found',
          });

          return;
        }

        let title = `${competition.name} ${competition.season.name} (${competition.area_name})`;
        if (competition.teamtype !== 'default') {
          title += ` ${competition.teamtype}`;
        }

        update({
          competition: { ...competition, title },
          siteTitle: title,
        });

        const seasonId = competition.season['season_id'];

        actions.competition.fetchPastMatches({ seasonId });
        actions.competition.fetchFutureMatches({ seasonId });
        actions.competition.fetchStandings({ seasonId });
      });
    };
  },

  fetchPastMatches(state, actions, { seasonId, limit = 10 }) {
    return (update) => {
      request(`/season/${seasonId}/matches/past/${limit}`, (matches) => {
        update(prevState => ({
          competition: { ...prevState.competition, pastMatches: matches },
        }));
        // TODO if (matches < limit) { this.show_more_nav = false; }
      });
    };
  },

  fetchFutureMatches(state, actions, { seasonId, limit = 10 }) {
    return (update) => {
      request(`/season/${seasonId}/matches/future/${limit}`, (matches) => {
        update(prevState => ({
          competition: { ...prevState.competition, futureMatches: matches },
        }));
        // TODO if (matches < limit) { this.show_more_nav = false; }
      });
    };
  },

  fetchStandings(state, actions, { seasonId }) {
    return (update) => {
      request(`/season/${seasonId}/standings`, (standings) => {
        update(prevState => ({
          competition: { ...prevState.competition, standings },
        }));
      });
    };
  },
};
