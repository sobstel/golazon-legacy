import request from '../lib/request';
import * as History from '../lib/history';

export default {
  competition (id) {
    return request(`competitions/${id}`).then((competition) => {
      if (competition) {
        History.add({
          area_name: competition.area_name,
          id: competition.competition_id,
          name: competition.name,
          rank: competition.rank,
          teamtype: competition.teamtype,
          type: 'competition'
        });
      }

      return competition;
    });
  }
};
