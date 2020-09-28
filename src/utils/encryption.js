const bcrypt = require('bcrypt');
const saltRounds = 10;
const yourPassword = "someRandomPasswordHere";

bcrypt.hash(yourPassword, saltRounds, (err, hash) => {
  // Now we can store the password hash in db.
});

  bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
  if res == true, password matched
  else wrong password
}
);
