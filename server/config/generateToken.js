const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id }, "KP15", {
        expiresIn: '90d',
    })
}

module.exports = generateToken