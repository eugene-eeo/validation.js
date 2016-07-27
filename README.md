# validation.js

[![Build Status](https://travis-ci.org/eugene-eeo/validation.js.svg?branch=master)](https://travis-ci.org/eugene-eeo/validation.js)

Browser-only library that makes it simple to do write efficient
data validation functions that combine errors. Read the [docs](docs/API.md)
or look at some [examples](docs/examples.js).

```js
function validate(username) {
    return Success(username)
        .ap(/^[a-z0-9\-]+$/.test(username)
            ? Success(username)
            : Failure(['only a-z, 0-9, and - allowed']))
        .ap(username.length >= 6
            ? Success(username)
            : Failure(['length must be >= 6']));
}

validate('#imp')    // => Failure(['length...', 'only...'])
validate('@onetwo') // => Failure(['only...'])
validate('perfect') // => Success('perfect')
```

### Install

Drop `validation.js` anywhere and incldue it in your HTML. It
exposes the `Success` and `Failure` globals.
