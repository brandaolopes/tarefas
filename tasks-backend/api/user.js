/* eslint-disable semi */
/* eslint-disable prettier/prettier */
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (erro, salt) => {
            bcrypt.hash(password, salt, null, (erro, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash

            app.db('users')
                .insert({name: req.body.name, email: req.body.email, password})
                .then(_ => res.status(204).send())
                .catch(erro => res.status(400).json(erro))
        })
    }
    return { save }
}