var test = require('tape');
var {check, ok, fail} = require('../validation');

test('check(truthy, err)', function(t) {
  var obj = {};
  var rv  = check(obj, 'err');
  t.ok(rv.isOk);
  t.equal(rv.val, obj);
  t.end();
});

test('check(falsy, err)', function(t) {
  var rv = check(0, 'err');
  t.deepEqual(rv, fail('err'));
  t.end();
});
