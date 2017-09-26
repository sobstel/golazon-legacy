/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const util = require('util');
const history = require('history');

let active_result_index = -1;
let delay = null;
this.results = [];
this.clear_button_visible = false;
this.hint = null;

const active_result = index => {
  if (index >= this.results.length) { index = 0; }
  if (index < 0) { index = Math.max(this.results.length - 1, 0); }

  for (let result of Array.from(this.results)) { result.active = false; }

  this.results[index].active = true;
  active_result_index = index;

  return this.update();
};

const reset_search_results = () => {
  active_result_index = -1;
  this.results = [];
  this.loading = false;
  this.clear_button_visible = false;
  return this.update();
};

const exit_search = () => {
  reset_search_results();
  this.hint = false;
  return this.update();
};

this.search = e => {
  const text = e.target.value;

  this.hint = false;
  this.clear_button_visible = true;

  if ((e.keyCode === 40) && (this.results.length > 0)) { // down arrow
    return active_result(active_result_index + 1);

  } else if ((e.keyCode === 38) && (this.results.length > 0)) { // up arrow
    return active_result(active_result_index - 1);

  } else if (e.keyCode === 27) { // esc
    return this.search_clear_click();

  } else if (e.keyCode === 13) { // enter
    // SMELL: hardcoded url to competition
    if (active_result_index >= 0) { riot.route(`/c/${this.results[active_result_index].id}`); }
    return exit_search();

  } else {
    if (delay) { util.terminate_delay(delay); }

    this.results_hint = false;

    if (text.length === 0) {
      this.loading = false;
      this.results = history.getAll(10);
      active_result(0);
      this.update();
      return;
    }

    this.results = history.search(text);

    if (text.length < 4) {
      this.results_hint = 'type 4 letters or more to search full database...';
      this.update();
      return;
    }

    // show before delay
    this.loading = true;
    this.update();

    return delay = util.delay(0.25, () => {
      return util.request(this, `/search?q=${text}`, results => {
        // filter out results found in search history
        this.results = this.results.concat(results.filter(result => {
          return this.results.filter(r => (r.type === result.type) && (r.id === result.id)).length === 0;
        })
        );
        if (this.results.length === 0) { this.hint = 'no results found'; }
        return this.update();
      });
    });
  }
};

this.search_result_mouseover = e => {
  return active_result((Array.from(this.results).map((result) => result.id)).indexOf(e.item.id));
};

this.search_result_click = e => {
  if (active_result_index >= 0) { history.update(this.results[active_result_index]); }
  exit_search();
  return true;
};

this.search_clear_click = e => {
  this.q.value = '';
  this.update();
  return exit_search();
};

this.go_home = e => {
  reset_search_results();
  return riot.route('/');
};
