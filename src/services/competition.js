import { request } from '../lib/util';

export default {
  find (id) {
    return request(`/competitions/${id}`);
  }
};
