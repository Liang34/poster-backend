/**
 * @description 跨域 中间件
 * @author liangjianhui
 */

const cors = require('koa2-cors')
const { corsOrigin } = require('../config/index')


module.exports = cors({
    origin: "*", // 允许来自指定域名请求,
    // maxAge: 5, // 本次预检请求的有效期，单位为秒。
    // methods:['GET','POST'],  // 所允许的HTTP请求方法
    //  alloweHeaders:['Conten-Type'], // 服务器支持的所有头信息字段
    credentials: true, // 允许跨域带 cookie
})
