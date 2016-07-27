# validation.js

Makes it simple to do write efficient data validation functions
that combine errors.

```js
function checkLength(value) {
    return value >= 6
        ? Success(value)
        : Failure(['length must be >= 6']);
}

function checkSymbols(value) {
    return /^[a-z0-9\-]+$/.test(value)
        ? Success(value)
        : Failure(['only a-z, 0-9, and - allowed']);
}

function validate(username) {
    return Success(username)
        .ap(checkSymbols(username))
        .ap(checkLength(username.length));
}

validate('#imp')    // => Failure(['length...', 'only...'])
validate('@onetwo') // => Failure(['only...'])
validate('perfect') // => Success('perfect')
```
