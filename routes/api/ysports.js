const qs = require('querystring')
const express = require('express')
const router = express.Router()
const request = require('request')

router.get('/leagues', (req, res) => {
  if (!req.session.user)
    return res.redirect('/auth/login')

  // const keys = ';game_keys=' + req.query.game_keys.join(',')
  const url = 'https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games/leagues?format=json'
  const accessToken = req.session.user.accessToken

  const options = {
    url,
    headers: { Authorization: 'Bearer ' + accessToken },
    rejectUnauthorized: false,
    json: true,
  }

  request.get(options, function(err, response, body) {
    if (err) {
      res.status(response.status)
      res.send(err)
    }
    res.send(body)
  })
})

router.get('/league/teams', (req, res) => {
  if (!req.session.user)
    return res.redirect('/auth/login')

  const { league_key: leagueKey } = req.query
  const url = `https://fantasysports.yahooapis.com/fantasy/v2/league/${leagueKey}/teams?format=json`
  const accessToken = req.session.user.accessToken

  const options = {
    url,
    headers: { Authorization: 'Bearer ' + accessToken },
    rejectUnauthorized: false,
    json: true,
  }

  request.get(options, function(err, response, body) {
    if (err) {
      res.status(response.status)
      res.send(err)
    }
    res.send(body)
  })
})

router.get('/teams', (req, res) => {
  if (!req.session.user)
    return res.redirect('/auth/login')

  const url = 'https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games/teams?format=json'
  const accessToken = req.session.user.accessToken

  const options = {
    url,
    headers: { Authorization: 'Bearer ' + accessToken },
    rejectUnauthorized: false,
    json: true,
  }

  request.get(options, function(err, response, body) {
    if (err) {
      res.status(response.status)
      res.send(err)
    }
    res.send(body)
  })
})

router.get('/games', (req, res) => {
  if (!req.session.user)
    return res.redirect('/auth/login')

  const url = 'https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games?format=json'
  const accessToken = req.session.user.accessToken

  const options = {
    url,
    headers: { Authorization: 'Bearer ' + accessToken },
    rejectUnauthorized: false,
    json: true,
  }

  request.get(options, function(err, response, body) {
    if (err) {
      res.status(response.status)
      res.send(err)
    }
    res.send(body)
  })
})

module.exports = router
