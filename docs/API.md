# API

```js
var succ = Success(1)
var fail = Failure(['err'])
```

`ok` and `err` calls the supplied functions, and always return the same
Success/Failure objects for chaining.

```js
succ.ok(v => console.log('ok', v))
    .err(v => console.log('err', v))
// ok 1
// => succ

fail.ok(v => console.log('ok', v)
    .err(v => console.log('err', v)
// err ['err']
// => fail
```

Calling `then` on a Success returns the result of calling the given
function, which (by convention) is assumed to return a Success/Failure
object. Calling `then` on an Error returns itself. By returning
Success/Failure objects, this also has the nice property that the
calls can be chained:

```js
succ.then(v => Success(1))
// => Success(1)

fail.then(v => Success(1))
// => fail

succ.then(v => (v >= 1 ? Success(v) : Failure(['err'])))
    .then(/* ... */)
    .then(/* ... */)
```

`.fmap` is the opposite of `then`:

```js
succ.fmap(v => Success(1))
// => succ

fail.fmap(v => Success(1))
// => Success(1)
```

`.ap` can be thought of as the non short-circuiting version of
`.then`. Whereas `.then` stops executing functions on the first
Error object, `.ap` will continue collecting Failure messages.
It returns the 'leftmost' argument (since that is what you usually
want), for instance:

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

So `succ.ap(foo)` can be read as "return `succ` if and only if
`foo` is also a Success". `.ap` is also different from `.then`
in that it accepts Success/Failure objects.

You can inspect the `isFailure` and `value` attributes as well,
but inspecting the former is not encouraged:

```js
succ.isFailure // => false
fail.isFailure // => true

console.log(succ.value) // 1
console.log(fail.value) // ['err']
```
