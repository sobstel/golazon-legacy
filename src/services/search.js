import request from '../lib/request';

export default {
  search (text) {
    return request(text, 'https://search.golazon.com/?q=');
  }
};
