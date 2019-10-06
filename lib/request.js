import request from 'superagent';

const API_URL = 'https://gf0tywygmf.execute-api.eu-west-2.amazonaws.com/prod/hyena?func=';

/**
 * @return Promise
 */
export default (path, api_url = API_URL) => {
  return request
    .get(api_url + path)
    .timeout({
      response: 8000, // wait for the server to start sending
      deadline: 32000 // wait for the file to finish loading
    })
    .retry(3)
    .then(response => response.body);
};
