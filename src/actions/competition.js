import { request } from '../lib/util';
import * as History from '../lib/history';

export default {
  fetchData(state, actions, { competitionId }) {
    return (update) => {
      update({ loadingCompetition: true });

      // fetch competition info
      request(`/competitions/${competitionId}`, (competition) => {
        if (!competition) {
          update({
            competition: {},
            title: 'Competition not found',
          });

          return;
        }

        let title = `${competition.name} ${competition.season.name} (${competition['area_name']})`;
        if (competition.teamtype !== 'default') {
          title += ` ${competition.teamtype}`;
        }

        update({
          competition: { ...competition, title },
          siteTitle: title,
          loadingCompetition: false,
        });

        // each competition read is recorded
        History.add({
          area_name: competition['area_name'],
          id: competition.competition_id,
          name: competition.name,
          teamtype: competition.teamtype,
          type: 'competition',
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
    const loadingKey = `loading${key.charAt(0).toUpperCase() + key.slice(1)}`;
    const matchesPerPage = 10;
    const limit = (state.competition[key] ? state.competition[key].length : 0) + matchesPerPage;

    return (update) => {
      update({ [loadingKey]: true });

      request(`/season/${seasonId}/matches/${type}/${limit}`, (matches) => {
        update(prevState => ({
          competition: {
            ...prevState.competition,
            [key]: matches,
          },
          [loadingKey]: false,
        }));
      });
    };
  },

  fetchStandings(state, actions, { seasonId }) {
    return (update) => {
      update({ loadingStandinds: true });

      request(`/season/${seasonId}/standings`, (standings) => {
        update(prevState => ({
          competition: { ...prevState.competition, standings },
          loadingStandinds: false,
        }));
      });
    };
  },
};
