/**
 * @description 通过邮箱验证码
 * @author liangjianhui
 */
// 验证码缓存
const { getVeriCodeFromCache } = require('../../cache/users/veriCode')
const {
    loginVeriCodeIncorrectFailInfo,
    createUserDbErrorFailInfo,
    userFrozenFailInfo,
} = require('../../res-model/failInfo/index')
const { ErrorRes, SuccessRes } = require('../../res-model/index')
const {
    findOneUserService,
    createUserService,
    updateUserInfoService,
} = require('../../service/users')
const doCrypto = require('../../utils/cryp')
const genPassword = require('../../utils/genPassword')
const { jwtSign } = require('../../utils/jwt')

/**
 * 通过邮箱验证码登录
 * @param {string} emialAddress 邮箱
 * @param {string} veriCode 验证码
 */
async function loginByemialAddress(emialAddress, veriCode) {
    const veriCodeFromCache = await getVeriCodeFromCache(emialAddress)
    if (veriCode !== veriCodeFromCache) {
        // 验证码不正确
        return new ErrorRes(loginVeriCodeIncorrectFailInfo)
    }

    // 先查找，找到的就返回
    const userInfo = await findOneUserService({
        emialAddress,
    })
    console.log(userInfo)
    if (userInfo) {
        // 用户是否冻结
        if (userInfo.isFrozen) return new ErrorRes(userFrozenFailInfo)

        // 更新最后登录时间
        try {
            await updateUserInfoService(userInfo.username, {
                latestLoginAt: new Date(),
            })
        } catch (ex) {
            console.error('更新最后登录时间错误', ex) // 只记录错误，不是主要错误，不影响登录逻辑
        }

        // 返回登录成功信息
        return new SuccessRes({
            token: jwtSign(userInfo),
        })
    }

    // 查找不到，再创建
    let password = genPassword() // 邮箱号注册，生成随机的密码
    password = doCrypto(password) // 加密密码

    try {
        const newUser = await createUserService({
            // 要符合 UserModel 的属性规定

            username: emialAddress, // 用邮箱号
            password,
            emialAddress,
            nickName: `海豹${emialAddress.slice(4)}`, // 默认给一个昵称
            latestLoginAt: new Date(),
        })
        // 创建成功
        return new SuccessRes({
            token: jwtSign(newUser),
        })
    } catch (ex) {
        console.error('创建用户失败', ex)
        return new ErrorRes(createUserDbErrorFailInfo)
    }
}

module.exports = loginByemialAddress
