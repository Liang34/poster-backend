/**
 * @description 数据校验 users
 * @author liangjianhui
 */

// 邮箱规则
const emailRule = {
    type: 'string',
    // eslint-disable-next-line prettier/prettier, no-useless-escape
    pattern: '^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$', // 邮箱正则
}
// 邮箱号 schema
const emailAddressSchema = {
    type: 'object',
    required: ['emialAddress'],
    properties: {
        emialAddress: emailRule,
        isRemoteTest: {
            type: 'boolean',
        },
    },
}

// 邮箱 + 短信验证码 schema
const emailVeriCodeSchema = {
    type: 'object',
    required: ['emialAddress', 'veriCode'],
    properties: {
        emialAddress: emailRule,
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
    emailAddressSchema,
    emailVeriCodeSchema,
    userInfoSchema,
}
