var V = require('../validation.js');
var assert = require('chai').assert;

var Success = V.Success;
var Failure = V.Failure;


describe('Failure', function() {
  it('.isFailure is true', function() {
    assert(Failure([]).isFailure);
  });

  it('.ok does not call the function and returns itself', function() {
    var itself = Failure(1);
    var rv = itself.ok(value => {
      assert(false);
    });
    assert(rv === itself);
  });

  it('.err does not call the function and returns itself', function() {
    var err = ['error'];
    var itself = Failure(err);
    var called;

    var rv = itself.err(value => {
      called = true;
      assert(value === err);
    });

    assert(called);
    assert(rv === itself);
  });

  it('.then does not call the function and returns itself', function() {
    var itself = Failure([]);
    assert(itself.then(a => assert(false)) === itself);
  });

  it('.ap works as expected', function() {
    var F1 = Failure(['e1']);
    var F2 = Failure(['e2']);
    var S1 = Success(1);
    var S2 = Success(2);

    assert.deepEqual(F1.ap(F2), Failure(['e1', 'e2']));
    assert.deepEqual(F2.ap(F1), Failure(['e2', 'e1']));
    assert(F1.ap(S1) === F1);
    assert(F1.ap(S2) === F1);
  });
});
