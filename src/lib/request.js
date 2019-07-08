import request from 'superagent';

const API_URL = 'https://gf0tywygmf.execute-api.eu-west-2.amazonaws.com/prod/hyena?func=';
/**
 * @return Promise
 */
export default (path) => {
  return request
    .get(API_URL + path)
    .timeout({
      response: 5000, // wait for the server to start sending
      deadline: 10000 // wait for the file to finish loading
    })
    .retry(3)
    .then(response => response.body);
};
