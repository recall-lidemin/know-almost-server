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
  locations: { type: [{ type: String }], select: false }, // 地址
  business: { type: String, select: false }, // 行业
  employments: {
    type: [{ company: { type: String }, job: { type: String } }],
    select: false,
  }, // 职业经历
  educations: {
    type: [
      {
        school: { type: String },
        major: { type: String },
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
})

module.exports = model('User', userSchema)
