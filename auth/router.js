const bcrypt = require('bcryptjs');

const router = require("express").Router();

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
    const userInfo = req.body;

    // pw will be hashed, rehashed 2 ^ 8th times
    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

    userInfo.password = hash;

  Users.add()
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                // remember client
                req.session.user = {
                    id: user.id,
                    username: user.username
                };
                // req.session.loggedIn = true;

                res.status(200).json({ hello: user.username });
            } else {
                res.status(401).json({ message: 'invalid credentials' });
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'error finding the user' });
        });
});

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(error => {
            if(error) {
                res.status(500).json({ message: 'you can checkout any time you like, but you can never leave ....' })
            } else {
                res.status(200).json({ message: 'logged out successfully' })
            }
        });
    } else {
        res.status(200).json({ message: 'I don\'t know you' })
    }
})

module.exports = router;
