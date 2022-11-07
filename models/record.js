const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 建構資料庫綱要
const recordSchema = new Schema({
  // 花費項目
  name: { type: String, required: true },
  // 花費日期
  date: { type: String, required: true },
  // 花費金額
  amount: { type: Number, required: true },
  // userId: { // 加入關聯設定
  //   type: Schema.Types.ObjectId,
  //   ref: 'User', // 定義參考對象是 User model
  //   index: true,
  //   required: true
  // },
  // categoryId: {
  //   type: Schema.Types.ObjectTd
  //   ref: 'Category', // 定義參考對象是 Category model
  //   index: true,
  //   required: true
  // }
})
// 輸出結果
module.exports = mongoose.model('Record', recordSchema)