// 載入 category model
const Category = require('../category')
// 定義 " 類別 "陣列
const categoryList = [
  { id: 1,
    name: '家居物業' },
  { id: 2,
    name: '交通出行' },
  { id: 3,
    name: '休閒娛樂' },
  { id: 4,
    name: '餐飲食品' },
  { id: 5,
    name: '其他' }
]
// 取得資料庫連線狀態
const db = require('../../config/mongoose')

// 連線成功
db.once('open', () => {
  console.log('categorySeeder: mongodb connected!')
  Promise.all(
    Array.from(
      { length: 5 },
      (_, i) => Category.create({ id: categoryList[i].id, name: categoryList[i].name})
    )
  )
   .then(() => {
    console.log('----- categorySeeder: done 呀！-----')
    process.exit()
   })
   .catch((error) => console.log(error))
})