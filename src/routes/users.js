/**
 * @description users router
 * @author liangjianhui
 */

const router = require('koa-router')()
const { SuccessRes } = require('../res-model/index')

// 中间件
const loginCheck = require('../middlewares/loginCheck')
const genValidator = require('../middlewares/genValidator')
const { emailAddressSchema, emailVeriCodeSchema, userInfoSchema } = require('../validator/users')

// controller
const sendVeriCode = require('../controller/users/sendVeriCode')
const loginByPhoneNumber = require('../controller/users/loginByPhoneNumber')
const updateUserInfo = require('../controller/users/updateUserInfo')

// 路由前缀
router.prefix('/api/users')

// 生成邮箱验证码
router.post('/genVeriCode', genValidator(emailAddressSchema), async ctx => {
    const { emailAddress } = ctx.request.body
    // 尝试发送验证码
    const res = await sendVeriCode(emailAddress)

    ctx.body = res
})

// 使用邮箱号登录
router.post('/loginByPhoneNumber', genValidator(emailVeriCodeSchema), async ctx => {
    const { emailAddress, veriCode } = ctx.request.body
    const res = await loginByPhoneNumber(emailAddress, veriCode)
    ctx.body = res
})

// 获取用户信息
router.get('/getUserInfo', loginCheck, async ctx => {
    // 经过了 loginCheck ，用户信息在 ctx.userInfo 中
    ctx.body = new SuccessRes(ctx.userInfo)
})

// 修改用户信息
router.patch('/updateUserInfo', loginCheck, genValidator(userInfoSchema), async ctx => {
    // 经过了 loginCheck ，用户信息在 ctx.userInfo 中
    const res = await updateUserInfo(ctx.userInfo, ctx.request.body)
    ctx.body = res
})

module.exports = router
