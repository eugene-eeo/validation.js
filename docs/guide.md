# Guide

The main component of the library is the `ok` and `fail` objects.
`ok` allows you to pass on a value to the next validator to ensure
that it is efficiently handled, e.g. you don't have to parse a date
again to ensure multiple conditions. `fail` allows you to wrap an
error message (not just a string, can be any object) and aggregate
errors. Examples:

```js
function isDave(username) {
    return username === 'dave'
        ? ok(username)
        : fail('not dave!');
}

isDave('john')   // => fail('not dave!')
isDave('dave')   // => ok('dave')
```

Usually we want to return one error message only. In the special
case where you want to return multiple error messages in one go,
you can use `fail.of`:

```js
fail.of([err1, err2])
```

Methods and attributes of both `ok` and `fail` objects:

 - `.isOk` - returns true if the object is an `ok`, else returns false.
 - `.then(fn)` - calls `fn` with the internal value and returns the
 return value, if it is called on an `ok` object. For `fail` objects
 this method does nothing and returns itself. Usually you want to
 return either `fail` or `ok` objects from the function.
 - `.fmap(fn)` - reads as 'failure-map'. Same behaviour as `.then(fn)`
 but this only calls the function when the method is called on a `fail`
 object.
 - `.ap(obj)` - best explained by example:

    ```js
    ok(1).ap(ok(2))         // => ok(1)
    ok(1).ap(fail('err'))   // => fail('err')

    fail('err').ap(fail('err2')) // => fail.of(['err', 'err2'])
    fail('err').ap(ok(1))        // => fail('err')
    ```

## Convenience functions

### `first(value, fn)`

Arguments:

 - `value`: can be anything.
 - `fn`: function that accepts two values, a checking function and
 the same `value` passed to `first`.

Fails fast on the first invalidation. Example:

```js
dv.first(-1, function(check, d) {
    check(d > 0, 'must be greater than zero!');
    // not executed
    check(d < 5, 'must be lesser than 5!');
})
// => fail('must be greater than zero!')
```


### `combine(value, xs)`

Arguments:

 - `value`: can be anything.
 - `xs`: array of `ok` or `fail` objects.

Best explained by example:

```js
dv.combine(1, [ok(2)]) // => ok(1)
dv.combine(1, [
    fail('err1'),
    fail('err2'),
    ok(2),
]);
// => fail.of(['err1', 'err2'])
```

### `check(v, message)`

Returns `ok(v)` if `v` is truthy, else returns `fail(message)`.
