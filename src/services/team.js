import request from '../lib/request';

export default {
  team (id) {
    return request(`teams/${id}`);
  },

  competitions (id) {
    return request(`teams/${id}/competitions`);
  }
};
