const Topic = require('../models/topics')
const User = require('../models/user')

class TopicsCtl {
  async find(ctx) {
    const { per_page = 10, page: pageNo } = ctx.query
    const page = Math.max(pageNo * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    ctx.body = await Topic.find({ name: new RegExp(ctx.query.q) }) // 支持模糊搜索
      .limit(perPage) // 限制每页显示perPage项
      .skip(page * perPage) // 跳过多少页显示perPage项
  }
  async findById(ctx) {
    const { fields = '' } = ctx.query
    const selectFields = fields
      .split(';')
      .filter((f) => f)
      .map((f) => '+' + f)
    const topic = await Topic.findById(ctx.params.id).select(selectFields)
    ctx.body = topic
  }
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
    })
    const topic = await new Topic(ctx.request.body).save()
    ctx.body = topic
  }
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
    })
    const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    ctx.body = { ...topic._doc, ...ctx.request.body }
  }
  async checkTopicExist(ctx, next) {
    const topic = Topic.findById(ctx.params.id)
    if (!topic) {
      ctx.throw(404, '话题不存在！')
    }
    next()
  }
  // 获取该话题的关注人数
  async listTopicsFollowers(ctx) {
    const topics = await User.find({ followingTopics: ctx.params.id })
    if (!topics) {
      ctx.throw(404)
    }
    ctx.body = topics
  }
}

module.exports = new TopicsCtl()
