var test = require('tape');
var dv = require('../validation');

test('combine(v, [ok...])', function(t) {
  var rv = dv.combine('v', [
    dv.ok(1),
    dv.ok(2),
  ]);
  t.deepEqual(rv, dv.ok('v'));
  t.end();
});

test('combine(v, [ok,fail])', function(t) {
  var rv = dv.combine('v', [
    dv.ok(1),
    dv.fail('err'),
  ]);
  t.deepEqual(rv, dv.fail('err'));
  t.end();
});

test('combine(v, [fail,fail])', function(t) {
  var rv = dv.combine('v', [
    dv.fail('e1'),
    dv.fail('e2'),
  ]);
  t.deepEqual(rv, dv.fail.of(['e1', 'e2']));
  t.end();
});
