var test = require('tape');
var {first, ok, fail} = require('../validation');


test('first (all ok)', function(t) {
  var rv = first(1, [
    v => ok(v),
    v => ok(v+1),
    v => ok(v+2),
  ]);
  t.deepEqual(rv, ok(4));
  t.end();
});


test('first (with fail)', function(t) {
  var rv = first(1, [
    v => ok(v),
    v => fail('fail'),
    v => t.fail(),
  ]);
  t.deepEqual(rv, fail('fail'));
  t.end();
});
