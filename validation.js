var dv = (function() {
  function ok(v) {
    if (!(this instanceof ok)) return new ok(v);
    this.val = v;
  }

  ok.prototype = {
    isOk: true,
    then: function(f) { return f(this.val); },
    fmap: function(f) { return this; },
    ap:   function(o) { return o.isOk ? this : o; },
  };

  function fail(v) {
    if (!(this instanceof fail)) return new fail(v);
    this.val = [v];
  }

  fail.of = function(v) {
    var f = fail();
    f.val = v;
    return f;
  }

  fail.prototype = {
    isOk: false,
    then: function(f) { return this; },
    fmap: function(f) { return f(this.val); },
    ap:   function(o) {
      return o.isOk
        ? this
        : fail.of(this.val.concat(o.val));
    }
  };

  function combine(v, xs) {
    return ok(v).ap(xs.reduce(function(prev, curr) {
      if (!prev) return curr;
      return prev.ap(curr);
    }));
  }

  function check(v, err) {
    return v
      ? ok(v)
      : fail(err);
  }

  function first(datum, fn) {
    function check(v, err) {
      if (!v) throw { name: 'HerbError', message: err };
    }
    try {
      fn(check, datum);
      return ok(datum);
    }  catch (e) {
      if (e.name !== 'HerbError') throw e;
      return fail(e.message);
    }
  }

  return {
    ok: ok,
    fail: fail,
    combine: combine,
    check: check,
    first: first,
  };
})();

if (typeof module.exports !== 'undefined') {
  module.exports = dv;
}
