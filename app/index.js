const koa = require('koa')
const error = require('koa-json-error')
const bodyParser = require('koa-bodyparser')
const parameter = require('koa-parameter')
const routing = require('./routes')
const mongoose = require('mongoose')
const { connectStr } = require('./config/index')

// 连接MongoDB数据库
mongoose.connect(
  connectStr,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('MongoDB连接成功！')
  }
)
mongoose.connection.on('error', console.error)

const app = new koa()
// 解析body参数中间件
app.use(bodyParser())
// 校验请求参数
app.use(parameter(app))
// 错误处理中间件
app.use(
  error({
    postFormat: (e, { stack, ...rest }) => {
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
    },
  })
)
// 循环挂载路由
routing(app)
// 开启监听
app.listen(3000, () => {
  console.log('server is running at 3000')
})

module.exports = app
