## Guide

The core of the library is the `ok` and `fail` objects. They
implement very few methods, best explained by example:

```js
var o = ok(1);
var f = fail('err');

o.isOk // => true
f.isOk // => false

o.value // => 1
f.value // => ['err']
```

`fail(v)` is a shorthand for `fail.of([v])` because most of
the time failures only have one error, and it is ugly to
repeat the array brackets. To return multiple errors in one go:

```js
fail.of(['err1', 'err2'])
```

`.then(fn)` on an `ok` object returns the value of calling the
function, which by convention is either an `ok` or a `fail`
object. However calling `.then` on a `fail` object will return
itself.

```js
o.then(v => ok(v+1))  // => ok(2)
o.then(v => fail(v))  // => fail(1)
f.then(v => ok(v+1))  // => f
```

`.fmap(fn)` is the opposite of `.then` - it calls the function
if `.fmap` is called on a `fail` object, and returns itself if
it is called on an `ok` object. For instance:

```js
o.fmap(v => ok(v+1)) // => o
f.fmap(v => ok(v))   // => ok(['err'])
```

`.ap` collects the errors, and returns the 'leftmost' `ok` object
if there are no failures. It is best illustrated by an example:

```js
o.ap(ok(2))
 .ap(ok(3))
// => o

f.ap(ok(1))
 .ap(fail('err2'))
 .ap(fail('err3'))
// => fail.of(['err', 'err2', 'err3'])
```

`combine` is the 'convenient' version of `.ap`. For instance
the following are equivalent:

```js
ok(1).ap(A).ap(B)
combine(1, [A, B])
```

`check(v, err)` returns `ok(v)` if the `v` is truthy, else it
returns `fail(err)`. It can be used as a shorthand:

```js
check('@'.length >= 10, 'length...')
// => fail('length...')
```

`chain`'s relation to `.then` is similar to how `combine` is
to `.ap`. For instance the following are equivalent:

```js
ok(1).then(v => ok(v + 1))
     .then(v => ok(v + 2))

chain(1, [
    v => ok(v + 1),
    v => ok(v + 2),
])
```
