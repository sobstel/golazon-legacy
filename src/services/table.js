import request from '../lib/request';

export default {
  seasonStandings (id) {
    return request(`/season/${id}/standings`);
  }
};
