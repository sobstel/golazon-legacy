const API_URL = 'http://futbol.date';
const TIMEOUT = 10; // seconds

export default (path) => {
  /* global fetch */
  const req = fetch(API_URL + path);

  const timeout = new Promise((resolve, reject) => {
    return setTimeout(() => reject(new Error('request timeout')), TIMEOUT * 1000);
  });

  return Promise.race([req, timeout]).then(response => response.json());
};
