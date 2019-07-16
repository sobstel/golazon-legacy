import request from '../lib/request';

export default {
  search (text) {
    return request(text.toLowerCase(), 'https://search.golazon.com/?q=');
  }
};
