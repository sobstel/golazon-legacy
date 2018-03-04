const API_URL = 'http://futbol.date';

//
// Returns request object
//
export function request(path, resolve) {
  /* global fetch */
  const req = fetch(API_URL + path);

  const timeout = new Promise((resolve, reject) => {
    return setTimeout(() => {
      reject(new Error('request timeout'));
    }, 10 * 1000);
  });

  return Promise.race([req, timeout])
    .then(response => response.json())
    .then(body => resolve ? resolve(body) : body)
    .catch(err => err.message); // TODO
}

let delayId = null;

export function delay(seconds, func) {
  delayId = setTimeout(func, seconds * 1000);
}

export function terminateDelay() {
  if (delayId) {
    clearTimeout(delayId);
  }
}

//
// Normalize date to UTC before converting
//
export function normalizeDate(date, time) {
  const y = date.slice(0, 4);
  const m = date.slice(5, 7) - 1;
  const d = date.slice(8, 10);
  const hr = time.slice(0, 2);
  const mn = time.slice(3, 5);

  return new Date(Date.UTC(y, m, d, hr, mn, 0));
}

//
// Format date
//
export function formatDate(date, time) {
  const d = normalizeDate(date, time);
  const today = new Date();

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const day = (`0${d.getDate()}`).slice(-2);

  if (d.toDateString() === today.toDateString()) { return 'Today'; }

  return `${month} ${day}`;
}

//
// Format time
//
export function formatTime(date, time) {
  const d = normalizeDate(date, time);

  const hour = (`0${d.getHours()}`).slice(-2);
  const min = (`0${d.getMinutes()}`).slice(-2);

  return `${hour}:${min}`;
}

// https://stackoverflow.com/a/9229821/219272
export function uniqBy(a, key) {
  const index = [];
  return a.filter((item) => {
    const k = item[key];
    return index.indexOf(k) >= 0 ? false : index.push(k);
  });
}
