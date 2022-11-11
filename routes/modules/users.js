const express = require('express')
const router = express.Router()
const User = require('../../models/user')

// 登入
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
})

// 註冊
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword }= req.body
  User.findOne({ email }).then(user => {
    if (user) {
      // 如果已經註冊：退回原本畫面
      console.log('User already exists.')
      res.render('register', {name, email, password, confirmPassword })
    } else {
      // 如果還沒註冊：寫入資料庫
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})

module.exports = router