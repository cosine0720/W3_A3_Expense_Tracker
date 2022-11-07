const mongoose = require('mongoose')
// 載入 category model
const Category = require('../category')
// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 定義 " 類別 "陣列
const categoryName = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('categorySeeder: mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('categorySeeder: mongodb connected!')
  Promise.all(
    Array.from(
      { length: 5 },
      (_, i) => Category.create({ name: categoryName[i] })
    )
  )
   .then(() => {
    console.log('----- categorySeeder: done 呀！-----')
    process.exit()
   })
})