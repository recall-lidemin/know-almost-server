const jwt = require('koa-jwt')
const Router = require('koa-router')
const { secret } = require('../config')
const route = new Router({ prefix: '/api' })
const {
  find,
  findById,
  create,
  update,
  listTopicsFollowers,
  checkTopicExist,
} = require('../controllers/topics')

const auth = jwt({ secret })

route.post('/topics', create) // 创建话题
route.get('/topics', find) // 获取话题列表
route.get('/topics/:id', findById) // 根据id获取某个话题
route.patch('/topics/:id', auth, update) // 更细当前话题
route.get(
  '/topics/:id/followingTopics',
  auth,
  checkTopicExist,
  listTopicsFollowers
)

module.exports = route
