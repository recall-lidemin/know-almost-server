const koa = require('koa')
const Router = require('koa-router')
const app = new koa()
const router = new Router()

router.get('/', (ctx) => {
  ctx.body = '用户列表'
})

app.use(router.routes())

app.listen(3000)
