/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
    const util = require('util');

    this.format_time = util.format_time;
    this.format_score = util.format_score;

    this.on('mount', () => {
      this.match = this.opts.match;
      return this.update();
    });
