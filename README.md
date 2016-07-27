# validation.js

[![Build Status](https://travis-ci.org/eugene-eeo/validation.js.svg?branch=master)](https://travis-ci.org/eugene-eeo/validation.js)

Browser-only library that makes it simple to do write efficient
data validation functions that combine errors.

```js
function validate(username) {
    return Success()
        .ap(/^[a-z0-9\-]+$/.test(value)
            ? Success(value)
            : Failure(['only a-z, 0-9, and - allowed']))
        .ap(username.length >= 6
            ? Success(value)
            : Failure(['length must be >= 6']));
}

validate('#imp')    // => Failure(['length...', 'only...'])
validate('@onetwo') // => Failure(['only...'])
validate('perfect') // => Success('perfect')
```

### Install

Drop `validation.js` anywhere and incldue it in your HTML. It
exposes the `Success` and `Failure` globals.

### Docs

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
Failure, but `.ap` continues collecting. Best illustrated by example:

```js
succ.ap(fail) // => fail
fail.ap(succ) // => fail

succ.ap(Success(2))
// => Success(2)

succ.ap(fail)
    .ap(Failure(['err2'])
    .ap(Success(2))
// => Failure(['err', 'err2'])
```
