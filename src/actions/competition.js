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

        actions.competition.fetchMatches({ type: 'past', seasonId });
        actions.competition.fetchMatches({ type: 'future', seasonId });
        actions.competition.fetchStandings({ seasonId });
      });
    };
  },

  fetchMatches(state, actions, { type, seasonId }) {
    const key = `${type}Matches`;
    const matchesPerPage = 10;
    const limit = (state.competition[key] ? state.competition[key].length : 0) + matchesPerPage;

    return (update) => {
      request(`/season/${seasonId}/matches/${type}/${limit}`, (matches) => {
        update(prevState => ({
          competition: {
            ...prevState.competition,
            [key]: matches,
          },
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
