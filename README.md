# 🌿 validation.js

Browser-side JS library for easily writing pure, testable data
validation functions that aggregate errors. Works great with the
[form-to-obj](https://github.com/chrisdavies/form-to-obj)
micro-library. Read the [guide](docs/guide.md), or get started
just by dropping `validation.js` anywhere and add a script tag
in your HTML. It exposes the `dv` global.

```js
function validate(username) {
    return dv.combine(username, [
        dv.check(v => v.length >= 6, 'length'),
        dv.check(v => /^[a-z]+$/.test(v), 'symbols'),
    ]);
}

validate('#s')      // => fail.of(['length', 'symbols'])
validate('@handle') // => fail.of(['symbols'])
validate('perfect') // => ok('perfect')
```

[![Build Status](https://travis-ci.org/eugene-eeo/validation.js.svg?branch=master)](https://travis-ci.org/eugene-eeo/validation.js)
