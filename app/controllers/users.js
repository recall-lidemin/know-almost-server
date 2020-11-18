const User = require('../models/user')
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config/index')

class UsersCtl {
  // 查询用户列表
  async find(ctx) {
    ctx.body = await User.find()
  }
  // 根据id查询某个用户信息
  async findById(ctx) {
    const { fields } = ctx.query
    const selectFields =
      fields &&
      fields
        .split(';')
        .filter((f) => f)
        .map((f) => '+' + f)
        .join('')

    const user = await User.findById(ctx.params.id).select(selectFields)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }
  // 新增用户
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
  // 更新用户信息
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
      avadar: { type: 'string', required: false },
      gender: { type: 'string', required: false },
      headline: { type: 'string', required: false },
      locations: { type: 'array', itemType: 'string', required: false },
      business: { type: 'string', required: false },
      employments: { type: 'array', itemType: 'object', required: false },
      educations: { type: 'array', itemType: 'object', required: false },
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) {
      ctx.throw('用户不存在')
    }
    ctx.body = user
  }
  // 删除用户
  async del(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) {
      ctx.throw('用户不存在')
    }
    ctx.body = user
  }
  // 登录
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
    const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' })
    ctx.body = { token }
  }
  //
  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '没有权限')
    }
    await next()
  }
  // 获取某个人的关注列表
  async listFollowing(ctx) {
    const user = await User.findById(ctx.params.id)
      .select('+following')
      .populate('following')
    if (!user) {
      ctx.throw(404)
    }
    ctx.body = user.following
  }
  // 获取粉丝列表
  async listFollowers(ctx) {
    const user = await User.find({ following: ctx.params.id })
    if (!user) {
      ctx.throw(404)
    }
    ctx.body = user
  }
  // 关注
  async follow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('following')
    if (!me.following.map((id) => id.toString()).includes(ctx.params.id)) {
      me.following.push(ctx.params.id)
      me.save()
    }
    ctx.status = 204
  }
  // 取消关注
  async unfollow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('following')
    const index = me.following.map((id) => id.toString()).indexOf(ctx.params.id)
    if (index > -1) {
      me.following.splice(index, 1)
      me.save()
    }
    ctx.status = 204
  }
}

module.exports = new UsersCtl()
