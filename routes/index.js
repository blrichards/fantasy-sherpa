const path = require('path')
const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
  if (!req.session.user) {
    return res.redirect('/auth/login')
  }
  return res.sendFile(path.join(__dirname, '../public/main/index.html'))
})

module.exports = router