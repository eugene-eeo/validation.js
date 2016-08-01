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
