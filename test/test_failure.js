var test = require('tape');
var {Success, Failure} = require('../validation.js');

test('Failure.isFailure', function(t) {
  t.equal(Failure(['err']).isFailure, true);
  t.end();
});

test('Failure.ok', function(t) {
  var f = Failure(['err']);
  var rv = f.ok(v => {
    t.fail('function should not be called');
  });
  t.equal(rv, f);
  t.end();
});

test('Failure.err', function(t) {
  t.plan(2);

  var err = ['err'];
  var f   = Failure(err);
  var rv  = f.err(v => {
    t.equal(v, err);
  });
  t.equal(rv, f);
  t.end();
});

test('Failure.then', function(t) {
  var f = Failure(['err']);
  var rv = f.then(v => {
    t.fail('function should not be called');
  });
  t.equal(rv, f);
  t.end();
});

test('Failure.fmap', function(t) {
  t.plan(2);

  var e = ['err'];
  var s = {};
  var f = Failure(e);
  var rv = f.fmap(v => {
    t.equal(v, e);
    return s;
  });

  t.equal(rv, s);
  t.end();
});

test('Failure.ap(success)', function(t) {
  var f1 = Failure(['err']);
  var s1 = Success(1);
  var rv = f1.ap(s1);

  t.equal(rv, f1);
  t.end();
});

test('Failure.ap(failure)', function(t) {
  var f1 = Failure(['e1']);
  var f2 = Failure(['e2']);
  var rv = f1.ap(f2);

  t.deepEqual(rv, Failure(['e1', 'e2']));
  t.end();
});
