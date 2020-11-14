const koajwt = require('koa-jwt')
const Router = require('koa-router')
const route = new Router({ prefix: '/api' })
const {
  find,
  create,
  update,
  del,
  login,
  checkOwner,
} = require('../controllers/users')
// const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')

// const auth = async (ctx, next) => {
//   const { authorization = '' } = ctx.request.header
//   const token = authorization.replace('Bearer ', '')
//   try {
//     const user = jsonwebtoken.verify(token, screet)
//     ctx.state.user = user
//   } catch (error) {
//     ctx.throw(401, error.message)
//   }
//   await next()
// }

// 实现用户认证与授权
const auth = koajwt({ secret })

route.get('/users', find)
route.post('/users', create)
route.patch('/users/:id', auth, checkOwner, update)
route.delete('/users/:id', auth, checkOwner, del)
route.post('/login', login)

module.exports = route
