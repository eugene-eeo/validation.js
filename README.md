# validation.js

An ADT for data validation.

```js
function validatePassword(obj) {
    var pwd = obj.password;
    return pwd.length >= 10
        ? Success(obj)
        : Failure(['password length must >= 10'])
}

function validLength(username) {
    return username.length >= 6
        ? Success(username)
        : Failure(['username length must >= 6']);
}

function validSymbols(username) {
    return /[a-z\-]+/.test(username)
        ? Success(username)
        : Failure(['username contains invalid symbols']);
}

function validateUsername(obj) {
    // .then returns the first error
    return Success(obj.username)
        .then(validLength)
        .then(validSymbols);
}

function validate(data) {
    // .ap combines errors
    return Success(data)
        .ap(validatePassword(data))
        .ap(validateUsername(data));
}

validate({
    username: '@fourfivesix',
    password: 'abc',
})
// => Failure(['password length...', 'username contains...'])

validate({
    username: '@four',
    password: 'abc',
})
// => Failure(['password length...', 'username length...'])

validate({
    username: 'perfectlyvalid',
    password: 'perfectlyvalid',
})
// => Success({...})
```
