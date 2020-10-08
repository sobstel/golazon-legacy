import request from 'superagent';

const HYENA_URL = 'https://75sgwy2tr3.execute-api.eu-west-2.amazonaws.com/prod/hyena?func=';

/**
 * DEPRECATED
 *
 * @return Promise
 */
export default (path, baseUrl = HYENA_URL) => {
  return request
    .get(baseUrl + path)
    .timeout({
      response: 4000, // wait for the server to start sending
      deadline: 8000 // wait for the file to finish loading
    })
    .retry(2)
    .then(response => response.body);
};
