const router = require('koa-router')()
const testMysqlConn = require('../db/mysql2')
const mongoose = require('../db/mongoose')
const packageInfo = require('../../package.json')
const { cacheGet, cacheSet } = require('../cache/index')
const { ENV } = require('../utils/env')

router.get('/api/db-check', async ctx => {
    // 测试 mysql 连接
    const mysqlRes = await testMysqlConn()

    // 测试 mongodb 连接
    let mongodbConn
    try {
        mongodbConn = true
        // 两个 model 公用一个 schema
        const contentSchema = mongoose.Schema(
            {
                // 页面的组件列表
                components: [Object],
                // 页面的属性，如页面背景图片
                props: Object,
                // 配置信息，如微信分享配置
                setting: Object,
            },
            { timestamps: true }
        )
        await mongoose.model('workContent1', contentSchema).findOne()
    } catch (ex) {
        mongodbConn = false
    }

    // 测试 redis 连接
    cacheSet('name', 'biz editor sever OK - by redis')
    const redisTestVal = await cacheGet('name')

    ctx.body = {
        errno: 0,
        data: {
            name: 'biz editor sever',
            version: packageInfo.version,
            ENV,
            mysqlConn: mysqlRes.length > 0,
            mongodbConn,
            redisConn: redisTestVal != null,
        },
    }
})

module.exports = router
