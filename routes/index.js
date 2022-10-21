const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('All up!')
})

module.exports = router
