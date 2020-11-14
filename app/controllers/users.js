const User = require('../models/user')

class UsersCtl {
  async find(ctx) {
    ctx.body = await User.find()
  }
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
    })
    const user = await new User(ctx.request.body).save()
    ctx.body = user
  }
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
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
}

module.exports = new UsersCtl()
