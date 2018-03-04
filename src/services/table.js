import { request } from '../lib/util';

export default {
  seasonStandings (id) {
    return request(`/season/${id}/standings`);
  }
};
