const path = require('path')
const express = require('express')
const request = require('request')
const router = express.Router()

router.get('/user', function(req, res) {
  if (req.session.user) {
    return res.send({
      user: req.session.user
    })
  }
  res.status(401)
  return res.send({
    error: 'user not logged in',
  })
})

router.get('/*', function(req, res) {
  if (!req.session.user) {
    return res.redirect('/auth/login')
  }
  // if (process.env.NODE_ENV === 'development') {
  // req.pipe(request('http://192.168.1.204:3000/' + req.url)).pipe(res)
  // } else {
  return res.sendFile(path.join(__dirname, '../public/main/index.html'))
  // }
})

module.exports = router
