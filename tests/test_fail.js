var test = require('tape');
var {ok,fail} = require('../validation');

test('fail.isOk', function(t) {
  t.equal(fail(1).isOk, false);
  t.end();
});

test('fail.of', function(t) {
  var arr = [1,2,3];
  var f1  = fail.of(arr);
  t.equal(f1.value, arr);
  t.end();
});

test('fail.then', function(t) {
  var f1 = fail(1);
  var rv = f1.then(v => {
    t.fail('function should not be called');
  });

  t.equal(rv, f1);
  t.end();
});

test('fail.fmap', function(t) {
  t.plan(2);

  var obj = {};
  var err = 1;
  var f1 = fail(err);
  var rv = f1.fmap(v => {
    t.deepEqual(v, [err]);
    return obj;
  });

  t.equal(rv, obj);
  t.end();
});

test('fail.ap(ok)', function(t) {
  var f1 = fail(1);
  var o1 = ok(2);
  var rv = f1.ap(o1);

  t.equal(rv, f1);
  t.end();
});

test('fail.ap(fail)', function(t) {
  var f1 = fail('e1');
  var f2 = fail('e2');
  var rv = f1.ap(f2);

  t.deepEqual(rv, fail.of(['e1', 'e2']));
  t.end();
});
