const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  avatar: { type: String }, // 头像
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
    required: true,
  }, // 性别
  headline: { type: String }, // 个人描述
  locations: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    select: false,
  }, // 地址
  business: { type: Schema.Types.ObjectId, ref: 'Topic', select: false }, // 行业
  employments: {
    type: [
      {
        company: { type: Schema.Types.ObjectId, ref: 'Topic' },
        job: { type: Schema.Types.ObjectId, ref: 'Topic' },
      },
    ],
    select: false,
  }, // 职业经历
  educations: {
    type: [
      {
        school: { type: Schema.Types.ObjectId, ref: 'Topic' },
        major: { type: Schema.Types.ObjectId, ref: 'Topic' },
        diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
        entrance_year: { type: Number },
        graduation_year: { type: Number },
      },
    ],
    select: false,
  }, // 教育经历
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    select: false,
  }, // 关注我的
  followingTopics: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    select: false,
  }, // 关注的话题
})

module.exports = model('User', userSchema)
