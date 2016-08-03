var test = require('tape');
var {check, ok, fail} = require('../validation');


test('check truthy', function(t) {
  var obj = {};
  var rv  = check(v => (v === obj), 'err')(obj);

  t.ok(rv.isOk);
  t.equal(rv.value, obj);
  t.end();
});


test('check falsy', function(t) {
  var obj = {};
  var rv  = check(v => (v === obj), 'err')({});

  t.deepEqual(rv, fail('err'));
  t.end();
});


test('check arguments', function(t) {
  var rv = check((a, b) => a === b, 'err')(1, 1);

  t.deepEqual(rv, ok(1));
  t.end();
});
