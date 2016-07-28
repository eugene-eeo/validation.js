var dv = (function() {
  function Success(value) {
    if (!(this instanceof Success)) return new Success(value);
    this.value = value;
  }

  Success.prototype = {
    isFailure: false,
    ok:   function(fn) { fn(this.value); return this; },
    err:  function(fn) { return this; },
    then: function(fn) { return fn(this.value); },
    fmap: function(fn) { return this; },
    ap:   function(obj) {
      return obj.isFailure
        ? obj
        : this;
    },
  };

  function Failure(value) {
    if (!(this instanceof Failure)) return new Failure(value);
    this.value = value;
  }

  Failure.prototype = {
    isFailure: true,
    ok:   function(fn) { return this; },
    err:  function(fn) { fn(this.value); return this; },
    then: function(fn) { return this; },
    fmap: function(fn) { return fn(this.value); },
    ap:   function(obj) {
      return obj.isFailure
        ? Failure(this.value.concat(obj.value))
        : this;
    },
  };

  function combine(value, fs) {
    return Success(value)
      .ap(fs.reduce(function(prev, curr) {
          if (!prev) return curr;
          return prev.ap(curr);
        }));
  }

  function check(cond, err) {
    return cond
      ? Success()
      : Failure([err]);
  }

  return {
    Success: Success,
    Failure: Failure,
    combine: combine,
    check: check,
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dv;
}
