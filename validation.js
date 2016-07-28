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

function chain(v, xs) {
  var curr = ok(v);
  for (var i = 0; i < xs.length; i++) {
    var fn = xs[i];
    curr = curr.then(fn);
    if (!curr.isOk)
      break;
  }
  return curr;
}

module.exports = {
  ok: ok,
  fail: fail,
  combine: combine,
  check: check,
  chain: chain,
};
