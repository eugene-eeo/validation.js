# 🌿 validation.js

Browser-side JS library for easily writing pure, testable data
validation functions that aggregate errors. Works great with the
[form-to-obj](https://github.com/chrisdavies/form-to-obj)
micro-library. Read the [guide](docs/guide.md), or get started
just by dropping `validation.browser.js` anywhere and add a
script tag in your HTML.

```js
function validate(username) {
    return dv.collect(username, [
        dv.check(username.length >= 6 ? dv.ok() : dv.fail('length')),
        dv.check(!/^[\W]$/.test(username) ? dv.ok : dv.fail('symbols')),
    ]);
}

validate('#s')      // => fail.of(['length', 'symbols'])
validate('@handle') // => fail.of(['symbols'])
validate('perfect') // => ok('perfect')
```

[![Build Status](https://travis-ci.org/eugene-eeo/validation.js.svg?branch=master)](https://travis-ci.org/eugene-eeo/validation.js)
