import { request } from '../lib/util';

export default {
  competition (id) {
    return request(`/competitions/${id}`);
  }
};
