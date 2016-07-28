(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dv = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});