import request from '../lib/request';

export default {
  search (text) {
    return request(`/search?q=${text}`);
  }
};
