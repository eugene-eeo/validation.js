# validation.js

[![Build Status](https://travis-ci.org/eugene-eeo/validation.js.svg?branch=master)](https://travis-ci.org/eugene-eeo/validation.js)

Browser-only library that makes it simple to write efficient data
validation functions that combine errors. Works great with
[form-to-obj](https://github.com/chrisdavies/form-to-obj). Read the
[docs](docs/API.md) or look at some [examples](docs/examples.js).

```js
function validate(username) {
    return dv.combine(username, [
        dv.check(username.length >= 6, 'length ...'),
        dv.check(/\W/.test(username),  'only...'),
    ]);
}

validate('#imp')    // => dv.Failure(['only...', 'length...'])
validate('@onetwo') // => dv.Failure(['only...'])
validate('perfect') // => dv.Success('perfect')
```

### Installation

Drop `validation.js` anywhere and include it a script tag. It
exposes the `dv` global.
