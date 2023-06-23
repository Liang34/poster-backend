/**
 * @description 数据校验 users
 * @author liangjianhui
 */

// 手机号规则
const emailRule = {
    type: 'string',
    pattern:
        /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, // 验证邮箱正则
}

// emailSchema
const emailSchema = {
    type: 'object',
    required: ['emailAddress'],
    properties: {
        emailAddress: emailRule,
        isRemoteTest: {
            type: 'boolean',
        },
    },
}

// 手机号 + 短信验证码 schema
const phoneNumberVeriCodeSchema = {
    type: 'object',
    required: ['phoneNumber', 'veriCode'],
    properties: {
        // phoneNumber: phoneNumberRule,
        veriCode: {
            type: 'string',
            pattern: '^\\d{4}$', // 四位数字
        },
    },
}

// 用户信息 schema
const userInfoSchema = {
    type: 'object',
    // 用户信息要符合 UserModel 配置
    required: ['nickName', 'gender'],
    properties: {
        nickName: {
            type: 'string',
        },
        gender: {
            type: 'integer', // 整数
            minimum: 0,
            maximum: 2,
        },
        picture: {
            type: 'string',
        },
        city: {
            type: 'string',
        },
    },
}

module.exports = {
    emailSchema,
    phoneNumberVeriCodeSchema,
    userInfoSchema,
}
