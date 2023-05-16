海报大师
● 框架：koa2
● 数据库：Mysql（sequelize） Mongodb（Mongoose） Redis
● 登录校验：JWT
● 单元测试和接口测试：Hest
● 线上服务：PM2 + nginx、

数据结构设计：
```jsvascript
{
  work: {
    title: '作品标题',
    setting: {/* 一些可能的配置项，用不到就先预留 */},
    props: {/* 页面body的一些设置，如背景色 */},
    components: [
      // components要用数组，有序结构
      // 单个node要符合常见的vnode格式
      {
        id: 'xxx', // 每个组件都有id，不重复
        name: '文本1',
        tag: 'text',
        attrs: { fontSize: '20px' },
        children: [
          '文本1' // 文本内容，有时候放在children，有时候放在attrs或者props，没有标准，看实际情况来确定
        ]
      },
      {
        id: 'yyy',
        name: '图片1',
        tag: 'image',
        attrs: { src: 'xxx.png', width: '100px' },
        children: null
      }
    ]
  }
}
```
使用Docker部署