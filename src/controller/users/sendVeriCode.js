/**
 * @description 发送短信验证码
 * @author liangjianhui
 */

const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const { getVeriCodeFromCache, setVeriCodeToCache } = require('../../cache/users/veriCode')
const { sendVeriCodeMsg } = require('../../vendor/sendMsg')
const {
    sendVeriCodeFrequentlyFailInfo,
    sendVeriCodeErrorFailInfo,
} = require('../../res-model/failInfo/index')
const { ErrorRes, SuccessRes } = require('../../res-model/index')
const { isDev, isTest, isPrd } = require('../../utils/env')
const { msgVeriCodeTimeout } = require('../../config/index')
const { smtpAuth } = require('../../config/envs/dev')
/**
 * 发送邮箱验证码
 * @param {string} emailAddress 邮箱地址
 * @param {boolean} isRemoteTest 是否测试
 */
async function sendVeriCode(emailAddress) {
    // 从缓存获取验证码，看是否有效
    const codeFromCache = await getVeriCodeFromCache(emailAddress)
    if (codeFromCache) {
        if (!isPrd) {
            // 非线上环境，直接返回
            return new SuccessRes({ code: codeFromCache })
        }
        // 说明刚刚已经发送过，不要再重新发送 —— 【注意】如不做这个限制，轻易重复发送，导致邮箱服务出问题
        return new ErrorRes(sendVeriCodeFrequentlyFailInfo)
    }

    // 缓存中没有，则发送
    const veriCode = Math.random().toString().slice(-4) // 生成随机数

    const transport = nodemailer.createTransport(
        smtpTransport({
            host: 'smtp.163.com', // 服务 由于我用的163邮箱
            port: 465, // smtp端口 默认无需改动
            secure: true,
            auth: smtpAuth,
        })
    )

    // let sendSuccess = false
    transport.sendMail(
        {
            from: smtpAuth.user, // 发件邮箱
            to: emailAddress, // 收件列表
            subject: '验证你的电子邮件', // 标题
            html: `
      <p>你好！</p>
      <p>您正在注册账号</p>
      <p>你的验证码是：<strong style="color: #ff4e2a;">${veriCode}</strong></p>
      <p>***该验证码5分钟内有效***</p>`, // html 内容
        },
        (error, data) => {
            transport.close() // 如果没用，关闭连接池
        }
    )
    // 发送短信成功，然后缓存，设置 timeout，重要！！！
    setVeriCodeToCache(emailAddress, veriCode, msgVeriCodeTimeout)

    // // 返回成功信息
    const resData = isPrd ? {} : { code: veriCode } // 非线上环境，返回验证码
    return new SuccessRes(resData)
}

module.exports = sendVeriCode
