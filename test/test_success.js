var test = require('tape');
var {Success, Failure} = require('../validation.js');

test('Success.isFailure', function(t) {
  t.equal(Success(1).isFailure, false);
  t.end();
});

test('Success.ok', function(t) {
  t.plan(2);
  var s = Success(1);
  var rv = s.ok(v => {
    t.equal(v, 1);
  });
  t.equal(rv, s);
  t.end();
});

test('Success.err', function(t) {
  var s = Success(1);
  var rv = s.err(v => {
    t.fail('function should not be called');
  });
  t.equal(rv, s);
  t.end();
});

test('Success.then(failure)', function(t) {
  t.plan(2);

  var s = Success(1);
  var f = Failure(['err']);
  var rv = s.then(v => {
    t.equal(v, 1);
    return f;
  });

  t.equal(rv, f);
  t.end();
});

test('Success.then(success)', function(t) {
  t.plan(2);

  var s1 = Success(1);
  var s2 = Success(2);
  var rv = s1.then(v => {
    t.equal(v, 1);
    return s2;
  });

  t.equal(rv, s2);
  t.end();
});

test('Success.ap(success)', function(t) {
  var s1 = Success(1);
  var s2 = Success(2);
  var rv = s1.ap(s2);

  t.equal(rv, s1);
  t.end();
});

test('Success.ap(failure)', function(t) {
  var s1 = Success(1);
  var f1 = Failure(['err']);
  var rv = s1.ap(f1);

  t.equal(rv, f1);
  t.end();
});
