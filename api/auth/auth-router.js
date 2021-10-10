const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../../config/secrets.js")
const Users = require('../users-model.js');
const {
  checkForDuplicates,
  checkPayload,
  checkUsernameExists,
} = require('../middleware/validate-user.js');

/*
module.exports = {
    add,
    findUsers,
    findByUserName,
    findByUserId,
}
*/

router.post('/register', checkPayload, checkForDuplicates, (req, res) => {

  let user = req.body;


  const rounds = process.env.BCRYPT_ROUNDS || 8; // 2 ^ 8
  const hash = bcrypt.hashSync(user.password, rounds);


  user.password = hash

  Users.add(user)
    .then(saved => {
      console.log("saved: ", saved)
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({
        message: `Error: ${err}`
      })
    }); 

});