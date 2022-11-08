if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Record = require('./models/record')
const handlebarsHelpers = require('./public/handlebars-helper')

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

// 載入樣版引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: handlebarsHelpers }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//首頁：瀏覽全部支出項目
app.get('/', (req, res) => {
  Record.find() // 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' }) //根據 _id 升冪排序
    .then(records => {
      let sum = 0
      for (let i = 0; i < records.length; i++) {
        sum += records[i].amount
      }
      return res.render('index', { records, sum })
    }) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 新增：支出（時間、項目、金額）
app.get('/records/new', (req, res) => {
  res.render('new')
})

app.post('/records', (req, res) => {
  const { name, date, category, amount } = req.body
  return Record.create({ name, date, category, amount })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// 修改：支出（時間、項目、金額）
app.get('/records/:id/edit', (req, res) => {
  const { id } = req.params
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

app.put('/records/:id', (req, res) => {
  const { id } = req.params
  const { name, date, category, amount } = req.body
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除：此項支出
app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log(`This app is opening on http://localhost:${PORT}`)
})