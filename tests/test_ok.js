var test = require('tape');
var {ok,fail} = require('../validation');

test('ok.isOk', function(t) {
  t.equal(ok(1).isOk, true);
  t.end();
});

test('ok.then', function(t) {
  t.plan(3);

  var obj = {};
  var succ = ok(1);
  var rv = succ.then(v => {
    t.equal(v, 1);
    return obj;
  });

  t.ok(rv.isOk);
  t.equal(rv.value, obj);
  t.end();
});

test('ok.fmap', function(t) {
  var succ = ok(1);
  var rv = succ.fmap(v => {
    t.fail('function should not be called');
  });

  t.equal(rv, succ);
  t.end();
});

test('ok.ap(ok)', function(t) {
  var o1 = ok(1);
  var o2 = ok(2);
  var rv = o1.ap(o2);

  t.equal(rv, o1);
  t.end();
});

test('ok.ap(fail)', function(t) {
  var o1 = ok(1);
  var f1 = fail(['err']);
  var rv = o1.ap(f1);

  t.equal(rv, f1);
  t.end();
});
