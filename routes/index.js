const path = require('path')
const express = require('express')
const router = express.Router()
const proxy = require('express-http-proxy')

router.all('/', function(req, res, next) {
  if (!req.session.user)
    return res.redirect('/auth/login')
  next()
})

if (process.env.NODE_ENV === 'development') {
  // If in development, proxy the react dev-server instead of serving the
  // production build
  router.use('/', proxy('localhost:3000'))
} else {
  // Is only reached if in production
  router.get('/', function(req, res) {
    return res.sendFile(path.join(__dirname, '../public/main/index.html'))
  })
}

module.exports = router
