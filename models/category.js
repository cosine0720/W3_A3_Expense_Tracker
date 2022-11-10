const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 建構資料庫綱要
const categorySchema = new Schema({
  // 類別名稱
  name: { type: String, required: true }
})

// const categoryIcons = [
//   'fa-house', 'fa-van-shuttle', 'fa-face-grin-beam', 'fa-utensils', 'fa-pen'
// ]

// 輸出結果
module.exports = mongoose.model('Category', categorySchema)