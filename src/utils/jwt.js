/**
 * @description jwt - verify sign
 * @author liangjianhui
 */

const util = require('node:util')
const jwt = require('jsonwebtoken')
const { JWT_SECRET, jwtExpiresIn } = require('../config/constant')

const verify = util.promisify(jwt.verify)

/**
 * jwt verify
 * @param {string} token token
 */
async function jwtVerify(token) {
    const data = await verify(token.split(' ')[1], JWT_SECRET) // 去掉前面的 Bearer
    return data
}

/**
 * jwt sign
 * @param {Object} data data
 */
function jwtSign(data) {
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: jwtExpiresIn })
    return token
}

module.exports = {
    jwtVerify,
    jwtSign,
}
