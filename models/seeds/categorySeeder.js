// 載入 category model
const Category = require('../category')
// 定義 " 類別 "陣列
const categoryName = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
// 取得資料庫連線狀態
const db = require('../../config/mongoose')

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