const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const Record = require('./models/record')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//首頁：瀏覽全部支出項目
app.get('/', (req, res) => {
  Record.find() // 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(records => res.render('index', { records })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})
// 新增：支出（時間、項目、金額）

// 修改：支出（時間、項目、金額）

app.listen(PORT, () => {
  console.log(`This app is opening on http://localhost:${PORT}`)
})