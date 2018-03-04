import { request } from '../lib/util';

export default {
  search (text) {
    return request(`/search?q=${text}`);
  },
};
