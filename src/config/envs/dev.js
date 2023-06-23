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
}
