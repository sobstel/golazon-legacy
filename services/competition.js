import request from '../lib/request';
import * as History from '../lib/history';

export default {
  competitions () {
    return request('competitions').then(competitions => {
      return competitions;
    });
  },

  competition (id) {
    return request(`competitions/${id}`).then((competition) => {
      if (competition) {
        History.add({
          area_name: competition['area_name'],
          id: competition['competition_id'],
          name: competition['name'],
          teamtype: competition['teamtype'],
        });
      }

      return competition;
    });
  }
};
