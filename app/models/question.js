const mongooes = require('mongoose')

const { Schema, model } = mongooes

const questionSchema = new Schema({
  __v: { type: Number, select: false },
  title: { type: String, required: true },
  desction: { type: String },
  questioner: { type: Schema.Types.ObjectId, ref: 'User', select: false },
})

module.exports = model('Question', questionSchema)
