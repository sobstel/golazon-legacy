import request from 'superagent';

/**
 * @return Promise
 */
export default function api(resource: string) {
  return request
    .get('api/' + resource)
    .timeout({
      response: 2500, // wait for the server to start sending
      deadline: 5000 // wait for the file to finish loading
    })
    .then(response => response.body);
};
