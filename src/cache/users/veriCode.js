/**
 * @description 短信验证码 缓存
 * @author liangjianhui
 */

const { cacheSet, cacheGet } = require('../index')

// cache key 前缀，重要！！否则数据容易混乱
const PREFIX = 'emailVeriCode-'

/**
 * 从缓存获取验证码
 * @param {string} emailAddress 邮箱地址
 */
async function getVeriCodeFromCache(emailAddress) {
    const key = `${PREFIX}${emailAddress}`
    const code = await cacheGet(key)
    if (code == null) return code
    return code.toString() // cacheGet 方法中有 JSON.parse
}

/**
 * 缓存验证码
 * @param {string} emailAddress 邮箱地址
 * @param {string} veriCode 验证码
 * @param {number} timeout timeout 单位 s
 */
async function setVeriCodeToCache(emailAddress, veriCode, timeout) {
    const key = `${PREFIX}${emailAddress}`
    cacheSet(key, veriCode, timeout)
}

module.exports = {
    getVeriCodeFromCache,
    setVeriCodeToCache,
}
