!function(window) {
  function success(value) {
    this.value = value;
    this.isFailure = false;
  }

  success.prototype = {
    ok:   function(fn) { fn(this.value); return this; },
    err:  function(fn) { return this; },
    then: function(fn) { return fn(this.value); },
    ap:   function(obj) {
      return obj.isFailure
        ? obj
        : this;
    },
  };

  function failure(value) {
    this.value = value;
    this.isFailure = true;
  }

  failure.prototype = {
    ok:   function(fn) { return this; },
    err:  function(fn) { fn(this.value); return this; },
    then: function(fn) { return this; },
    ap:   function(obj) {
      return obj.isFailure
        ? Failure(this.value.concat(obj.value))
        : this;
    }
  };

  window.Success = function(v) { return new success(v); }
  window.Failure = function(v) { return new failure(v); }
}(window);
