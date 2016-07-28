var test = require('tape');
var dv   = require('../validation.js');

test('dv.check(true, err)', function(t) {
  var expect = dv.Success();
  var actual = dv.check(true, 1);

  t.deepEqual(actual, expect)
  t.end();
});

test('dv.check(false, err)', function(t) {
  var expect = dv.Failure(['abc'])
  var actual = dv.check(false, 'abc')

  t.deepEqual(actual, expect);
  t.end();
});

test('dv.combine(Success...)', function(t) {
  var obj = {};
  var rv = dv.combine(obj, [
    dv.check(true, 'e1'),
    dv.check(true, 'e2'),
    dv.check(true, 'e3'),
  ]);

  t.notOk(rv.isFailure);
  t.equal(rv.value, obj);
  t.end();
});

test('dv.combine(Failure...)', function(t) {
  var rv = dv.combine(1, [
    dv.check(true,  'e1'),
    dv.check(false, 'e2'),
    dv.check(false, 'e3'),
  ]);
  t.deepEqual(rv, dv.Failure(['e2', 'e3']));
  t.end();
});
