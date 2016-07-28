# 🌿 validation.js

Browser-side JS library for easily writing pure data validation
functions that aggregate errors. Works great with [form-to-obj](https://github.com/chrisdavies/form-to-obj).
Read the [guide](docs/guide.md) or look at some [examples](docs/examples.js).
To install, just drop `validation.browser.js` anywhere and add
a script tag in your HTML.

```js
function validate(username) {
    return dv.collect(username, [
        dv.check(username.length >= 6 ? dv.ok() : dv.fail('length')),
        dv.check(!/^[\W]$/.test(username) ? dv.ok : dv.fail('symbols')),
    ]);
}

validate('#s')      // => fail.of(['length', 'symbol'])
validate('@handle') // => fail.of(['symbol'])
validate('perfect') // => ok('perfect')
```
