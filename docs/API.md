# API

```js
var succ = Success(1);
var fail = Failure(['err']);
```

`ok` and `err` always return the same Success/Failure objects
for chaining.

```js
succ.ok(v => console.log('ok', v))
    .err(v => console.log('err', v));
// ok 1
// => succ

fail.ok(v => console.log('ok', v)
    .err(v => console.log('err', v);
// err ['err']
// => fail
```

Calling `then` on a Success returns the result of calling the given
function, which is assumed to be a Success/Failure object. Calling
`then` on an Error returns itself.

```js
succ.then(v => Success(1))
// => Success(1)

fail.then(v => Success(1));
// => fail
```

`.ap` is similar to how the AND operation is to OR. In the same way
it is the OR version of `then`. `then` short circuits on the first
Failure, but `.ap` continues collecting. Note the return value. Best
illustrated by example:

```js
succ.ap(fail) // => fail
fail.ap(succ) // => fail

succ.ap(Success(2))
// => succ

succ.ap(fail)
    .ap(Failure(['err2'])
    .ap(Success(2))
// => Failure(['err', 'err2'])
```

You can inspect the `isFailure` attributes as well:

```js
succ.isFailure // => false
fail.isFailure // => true
```
