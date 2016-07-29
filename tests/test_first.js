var test = require('tape');
var dv = require('../validation');

test('dv.first with error', function(t) {
  t.plan(2);

  var obj = {};
  var rv = dv.first(obj, function(check, d) {
    t.equal(d, obj);
    check(true,  'not-shown');
    check(false, 'message');
    t.fail();
  });

  t.deepEqual(rv, dv.fail('message'));
  t.end();
});

test('dv.first without error', function(t) {
  t.plan(3);

  var obj = {};
  var rv = dv.first(obj, function(check, d) {
    check(true, 'err1');
    t.ok(true);
    check(true, 'err2');
    t.ok(true);
  });

  t.deepEqual(rv, dv.ok(obj));
  t.end();
});
