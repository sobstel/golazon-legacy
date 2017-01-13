if (!Array.prototype.find) {
  Array.prototype.find = function () {
    return this.filter.apply(this, [].slice.call(arguments))[0];
  };
}
