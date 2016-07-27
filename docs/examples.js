function validateUsername(username) {
  return username.length >= 6
    ? Success(username)
    : Failure(['username length must >= 12']);
}

function isValidFormat(birthday) {
  var date = moment(birthday, 'DD/MM/YYYY');
  return date.isValid()
    ? Success(date)
    : Failure(['invalid birthday format']);
}

function isOldEnough(date) {
  var min = moment().subtract(moment.duration(18, 'years'));
  return date.isAfter(min)
    ? Success(date)
    : Failure(['not old enough']);
}

function validateBirthday(birthday) {
  return Success(birthday)
    .then(isValidFormat)
    .then(isOldEnough);
}

function validate(user) {
  return Success(user)
    .ap(validateUsername(user.username))
    .ap(validateBirthday(user.birthday));
}

validate({
  username: 'short',
  birthday: 'invalid',
});
// => Failure(['username length...', 'invalid birthday...'])

validate({
  username: 'too_young',
  birthday: '21-01-2016',
});
// => Failure(['not old enough'])

validate({
  username: 'perfectlyvalid',
  birthday: '21-12-1981',
});
// => Success({...})
