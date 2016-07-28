var test = require('tape');
var dv = require('../validation');

test('chain', function(t) {
  var chain = [
    v => (v.length ? dv.ok(v.length) : dv.fail('length')),
    v => (v >= 2   ? dv.ok(v) : dv.fail('2')),
  ];
  t.deepEqual(dv.chain('',  chain), dv.fail.of(['length']));
  t.deepEqual(dv.chain('1', chain), dv.fail.of(['2']));
  t.deepEqual(dv.chain('11', chain), dv.ok(2));
  t.end();
});
