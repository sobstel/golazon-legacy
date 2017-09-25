import { request, setSiteTitle } from '../lib/util';

export default {
  fetchData(state, actions, competitionId) {
    return update => {
      request(`/competitions/${competitionId}`, competition => {
        let title = 'Competition not found';
        if (competition) {
          title = `${competition.name} ${competition.season.name} (${competition.area_name})`;
          if (competition.teamtype !== 'default') {
            title += ` ${competition.teamtype}`;
          }
        }

        update({ competition, title });

        // TODO: load matches
      });
    };
  }
};
