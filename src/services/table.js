import { request } from '../lib/util';

export default {
  seasonStandings (seasonId) {
    return request(`/season/${seasonId}/standings`);
  }
};
