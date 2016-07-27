var V = require('../validation.js');
var assert = require('chai').assert;

var Success = V.Success;
var Failure = V.Failure;


describe('Success', function() {
  it('.ok calls the function and returns itself', function() {
    var called;
    var itself = Success(1);
    var rv = itself.ok(value => {
      assert(value === 1);
      called = true;
    });
    assert(called);
    assert(rv === itself);
  });

  it('.err does not call the function and returns itself', function() {
    var itself = Success(1);
    assert(itself.err(() => assert(false)) === itself);
  });

  it('.then calls the function', function() {
    var called;
    assert(Success(1).then(a => {
      called = true;
      return a;
    }) === 1);
    assert(called);
  });

  it('.ap works as expected', function() {
    var S1 = Success(1);
    var S2 = Success(2);
    var F1 = Failure(['error']);

    assert(S1.ap(S2) === S1);
    assert(S2.ap(S1) === S2);
    assert(S1.ap(F1) === F1);
    assert(S2.ap(F1) === F1);
  });
});
