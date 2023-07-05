/**
 * @description dev 配置
 * @author liangjianhui
 */

module.exports = {
    // mysql 连接配置
    mysqlConf: {
        host: 'localhost',
        user: 'root',
        password: '550530',
        port: '3306',
        database: 'poster',
    },
    // mongodb 连接配置
    mongodbConf: {
        host: 'localhost',
        port: '27017',
        dbName: 'poster',
    },

    // redis 连接配置
    redisConf: {
        port: '6379',
        host: '127.0.0.1',
    },
    // SMTP
    smtpAuth: {
        user: '18948006184@163.com',
        pass: 'ZIEUFIMWRMCCLJNS', // SMTP授权码
    },

    // 短信验证码缓存时间，单位 s
    msgVeriCodeTimeout: 2 * 60,
    // 内容审核
    // APP_ID, API_KEY, SECRET_KEY } = baiduCloudCensorConf
    baiduCloudCensorConf: {
        APP_ID: 35276645,
        API_KEY: 'iGgvT6Umz5pSZ7tPRvgPsbT9',
        SECRET_KEY: 'QHH02yYZkDRQiM1C5kL31DeG7FWFOe2S',
    },
    // 发布出来的 h5 域名
    h5Origin: 'http://localhost:3001',
    // jwt过期时间
    jwtExpiresIn: '1d',
    // 阿里云 OSS 配置
    aliyunOSSConf: {
        accessKeyId: 'LTAI5t6rWpmiNfUENfG352z2',
        accessKeySecret: 'LDiPOPMVVjJbf1af0wzOc0zSSQ963v',
        bucket: 'poster-master',
        region: 'oss-cn-guangzhou',
    },
    // 阿里云 OSS CDN 配置，Sam 老师提供
    aliyunOSS_CDNHost: 'static-dev.imooc-lego.com',
    // 允许跨域
    corsOrigin: '*',
}
