const app = require('./app')
const config = require('./app/config')

app.listen(config.APP_PORT , () => {
  console.log(`服务${config.APP_PORT}启动成功`);
})
