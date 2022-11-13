if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
// 載入 record model
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: '郝酉潛',
  email: 'root@example.com',
  password: '12345678'
}

// 連線成功
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 3 },
        (_, i) => Record.create({ name: `帝寶${i}期`, date: `2022-12-31`, categoryId: i + 1, amount: 35, userId })
      ))
    })
    .then(() => {
      console.log('----- recordSeeder: done 啊！------')
      process.exit()
    })
})