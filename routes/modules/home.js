const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

//首頁：瀏覽全部支出項目
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId }) // 取出 Record model 裡屬於登入使用者的的所有資料
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

// 篩選：按「類別」顯示支出清單
router.get('/search', (req, res) => {
  const userId = req.user._id
  const id = req.query.categoryId
  Record.find({ userId })
    .lean()
    .then(records => {
      const filterRecordsData = records.filter(data =>
        data.categoryId === Number(id)
      )
      let sum = 0
      for (let i = 0; i < filterRecordsData.length; i++) {
        sum += filterRecordsData[i].amount
      }
      res.render('index', { records: filterRecordsData, id, sum })
    })
    .catch(err => console.log(err))
})

module.exports = router