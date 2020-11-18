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
  findById,
  listFollowing,
  follow,
  unfollow,
  listFollowers,
} = require('../controllers/users')
const { secret } = require('../config')

// 实现用户认证与授权
const auth = koajwt({ secret })

route.get('/users', auth, find)
route.get('/users/:id', auth, checkOwner, findById)
route.get('/users/:id/following', auth, listFollowing)
route.get('/users/:id/followers', auth, listFollowers)
route.put('/users/following/:id', auth, follow)
route.delete('/users/following/:id', auth, unfollow)
route.post('/users', create)
route.patch('/users/:id', auth, checkOwner, update)
route.delete('/users/:id', auth, checkOwner, del)
route.post('/login', login)

module.exports = route
