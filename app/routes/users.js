const jwt = require('koa-jwt')
const Router = require('koa-router')
const route = new Router({ prefix: '/api' })
const {
  login,
  find,
  findById,
  create,
  update,
  del,
  checkOwner,
  listFollowers,
  listFollowing,
  checkUserExist,
  follow,
  unfollow,
  followTopic,
  unfollowTopic,
  listFollowingTopics,
} = require('../controllers/users')
const { checkTopicExist } = require('../controllers/topics')
const { secret } = require('../config')
// 实现用户认证与授权
const auth = jwt({ secret })

route.post('/login', login) // 登录
route.post('/users', create) // 创建用户
route.get('/users', auth, find) // 获取用户列表
route.get('/users/:id', auth, findById) // 根据id获取某个用户
route.patch('/users/:id', auth, checkOwner, update) // 更细当前用户
route.delete('/users/:id', auth, checkOwner, del) // 删除当前用户
route.get('/users/:id/following', auth, listFollowing) // 某个用户的关注列表
route.get('/users/:id/followers', auth, listFollowers) // 某个用户的粉丝列表
route.put('/users/following/:id', auth, checkUserExist, follow) // 关注用户
route.delete('/users/following/:id', auth, checkUserExist, unfollow) // 取消关注用户
route.put('/users/followingTopics/:id', auth, checkTopicExist, followTopic) // 关注话题
route.delete('/users/followingTopics/:id', auth, checkTopicExist, unfollowTopic) // 取消关注话题
route.get('/users/:id/followingTopics', auth, listFollowingTopics) // 获取关注的话题

module.exports = route
