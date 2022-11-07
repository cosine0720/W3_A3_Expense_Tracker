const mongoose = require('mongoose')
// 載入 record model
const Record = require('../record')
// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('recordSeeder: mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('recordSeeder: mongodb connected!')
  Promise.all(
    Array.from(
      { length: 3 },
      (_, i) => Record.create({ name: `name-${i}`, date: `2022/01/01`, amount: `60` })
    )
  )
    .then(() => {
      console.log('----- recordSeeder: done 啊！------')
      process.exit()
    })
})