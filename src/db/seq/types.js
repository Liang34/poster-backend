/**
 * @description 封装 sequelize 类型
 * @author liangjianhui
 */

const Sequelize = require('sequelize')

module.exports = {
    STRING: Sequelize.STRING, // VARCHAR(255)
    TEXT: Sequelize.TEXT, // TEXT
    INTEGER: Sequelize.INTEGER,
    BOOLEAN: Sequelize.BOOLEAN,
    DATE: Sequelize.DATE,
}
