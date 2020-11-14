const User = require('../models/user')
const jsonwebtoken = require('jsonwebtoken')
const { screet } = require('../config/index')

class UsersCtl {
  async find(ctx) {
    ctx.body = await User.find()
  }
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const { name } = ctx.request.body
    const repeatedUser = await User.findOne({ name })
    if (repeatedUser) {
      ctx.throw(409, '用户已经存在')
    }
    const user = await new User(ctx.request.body).save()
    ctx.body = user
  }
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) {
      ctx.throw('用户不存在')
    }
    ctx.body = user
  }
  async del(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) {
      ctx.throw('用户不存在')
    }
    ctx.body = user
  }
  async login(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const user = await User.findOne(ctx.request.body)
    if (!user) {
      ctx.throw(401, '用户名或密码不正确')
    }
    const { _id, name } = user
    const token = jsonwebtoken.sign({ _id, name }, screet, { expiresIn: '1d' })
    ctx.body = { token }
  }
  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '没有权限')
    }
    await next()
  }
}

module.exports = new UsersCtl()
