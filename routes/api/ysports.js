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
      res.status(500)
      return res.send(err)
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
      res.status(500)
      return res.send(err)
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
      res.status(500)
      return res.send(err)
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
      res.status(500)
      return res.send(err)
    }
    res.send(body)
  })
})

router.get('/team/roster', (req, res) => {
  if (!req.session.user)
    return res.redirect('/auth/login')

  const { team_key: teamKey } = req.query
  const url = `https://fantasysports.yahooapis.com/fantasy/v2/team/${teamKey}/roster?format=json`
  const accessToken = req.session.user.accessToken

  const options = {
    url,
    headers: { Authorization: 'Bearer ' + accessToken },
    rejectUnauthorized: false,
    json: true,
  }

  request.get(options, function(err, response, body) {
    if (err) {
      res.status(500)
      return res.send(err)
    }
    res.send(body)
  })
})

router.get('/league/players', (req, res) => {
  if (!req.session.user)
    return res.redirect('/auth/login')

  const { league_key: leagueKey, start, count } = req.query
  const url =  `https://fantasysports.yahooapis.com/fantasy/v2/league/${leagueKey}/players;sort=AR;start=${start};count=${count}?format=json`
  const accessToken = req.session.user.accessToken

  const options = {
    url,
    headers: { Authorization: 'Bearer ' + accessToken },
    rejectUnauthorized: false,
    json: true,
  }

  request.get(options, function(err, response, body) {
    if (err) {
      res.status(500)
      return res.send(err)
    }
    res.send(body)
  })
})

router.get('/league/players/taken', (req, res) => {
  if (!req.session.user)
    return res.redirect('/auth/login')

  const { league_key: leagueKey, start, count } = req.query
  const url =  `https://fantasysports.yahooapis.com/fantasy/v2/league/${leagueKey}/players;status=T;sort=AR;start=${start};count=${count}?format=json`
  const accessToken = req.session.user.accessToken

  const options = {
    url,
    headers: { Authorization: 'Bearer ' + accessToken },
    rejectUnauthorized: false,
    json: true,
  }

  request.get(options, function(err, response, body) {
    if (err) {
      res.status(500)
      return res.send(err)
    }
    res.send(body)
  })
})

// router.put('/team/swap', (req, res) => {
//   if (!req.session.user)
//     return res.redirect('/auth/login')
//
//   const { league_key: leagueKey, start, count } = req.query
//   const url =  `https://fantasysports.yahooapis.com/fantasy/v2/league/${leagueKey}/players;status=T;sort=AR;start=${start};count=${count}?format=json`
//   const accessToken = req.session.user.accessToken
//
//   const options = {
//     url,
//     headers: { Authorization: 'Bearer ' + accessToken },
//     rejectUnauthorized: false,
//     json: true,
//   }
//
//   request.get(options, function(err, response, body) {
//     if (err) {
//       res.status(500)
//       return res.send(err)
//     }
//     res.send(body)
//   })
// })

module.exports = router
