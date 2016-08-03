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

    ```js
    ok(1).isOk    // true
    fail(1).isOk  // false
    ```

 - `.value` - internal value of the object. For `ok` it is the value which
 was passed to it during construction, For `fail` it is an array of errors.

    ```js
    ok(1).value          // 1
    fail.of([1,2]).value // [1,2]
    ```

 - `.then(fn)` - calls `fn` with the internal value and returns the result
 if it is called on an `ok` object. For `fail` objects this method does
 nothing and returns itself. Usually you want to return `ok` or `fail`
 objects in the `fn`.

    ```js
    ok(1).then(v => ok(v+1))     // => ok(2)
    fail('err').then(v => ok(v)) // => fail('err')
    ```

 - `.fmap(fn)` - reads as 'failure-map'. When called on `ok` it just
 returns itself. When called on a `fail` it is equivalent to the following:

    ```js
    var r = fail('err');
    fail.of(r.value.map(fn));
    ```

 - `.ap(obj)` - best explained by example:

    ```js
    ok(1).ap(ok(2))         // => ok(1)
    ok(1).ap(fail('err'))   // => fail('err')

    fail('err').ap(fail('err2')) // => fail.of(['err', 'err2'])
    fail('err').ap(ok(1))        // => fail('err')
    ```

## Convenience functions

### `first(value, xs)`

Arguments:

 - `value`: can be anything.
 - `xs`: an array of functions that return either `fail` or `ok`.

Fails fast on the first invalidation. Example:

```js
dv.first(-1, [
    v => fail('smaller than 0'),
    v => ok(v+1), // not executed
]);
// => fail('smaller than 0')
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

### `check(fn, message)`

Convenience function for turning `fn`, a function that accepts any
value and returns a boolean into a function that returns `ok(value)`
or `fail(message)`. Example:

```js
var v = check(v => v.length > 0, 'err');
v('abc') // => ok('abc')
v('')    // => fail('err')
```
