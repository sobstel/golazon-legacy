import { request } from '../lib/util';

export default {
  find (competitionId) {
    return request(`/competitions/${competitionId}`);
  }
};
