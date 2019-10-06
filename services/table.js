import request from '../lib/request';

export default {
  seasonStandings (id) {
    return request(`seasons/${id}/standings`);
  }
};
