const express = require('express')
const router = express.Router()
const YQL = require('yql')
const { clientId, clientSecret } = require('../../config/yahoo')

router.get('/leagues', (req, res) => {
  if (!req.session.user)
    return res.redirect('/auth/login')
  const qs = 'select * from fantasysports.games where game_key="238"'
  const options = {
    Authorization: 'BEARER ' + req.session.user.accessToken
  }
  const query = new YQL(qs, options)
  query.exec((err, qres) => {
    if (err)
      res.send(err)
    console.log(qres)
  })
})

module.exports = router
