const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  // 花費項目
  name: { type: String, required: true },
  // 花費日期
  date: { type: Date, required: true },
  // 花費金額
  amount: { type: Number, required: true },
  // userId: { // 加入關聯設定
  //   type: Schema.Types.ObjectId,
  //   ref: 'User', // 定義參考對象是 User model
  //   index: true,
  //   required: true
  // }
})
module.exports = mongoose.model('Record', recordSchema)