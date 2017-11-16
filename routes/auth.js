const qs = require('querystring')
const request = require('request')
const express = require('express')
const router = express.Router()

const { clientId, clientSecret, redirectUri } = require('../config/yahoo')
const { User } = require('../config/db')

router.get('/login', function(req, res) {
  return res.render('login', {
    title: 'Login'
  })
})

router.get('/yahoo', function(req, res) {
  const authorizationUrl = 'https://api.login.yahoo.com/oauth2/request_auth'

  const queryParams = qs.stringify({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
  })

  res.redirect(authorizationUrl + '?' + queryParams)
})

router.get('/yahoo/callback', function(req, res) {
  const accessTokenUrl = 'https://api.login.yahoo.com/oauth2/get_token'

  const options = {
    url: accessTokenUrl,
    headers: {
      Authorization: 'Basic ' +
      new Buffer(clientId + ':' + clientSecret).toString('base64'),
    },
    rejectUnauthorized: false,
    json: true,
    form: {
      code: req.query.code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    },
  }

  // 1. Exchange authorization code for access token.
  request.post(options, function(err, response, body) {
    const guid = body.xoauth_yahoo_guid
    const accessToken = body.access_token
    const socialApiUrl = 'https://social.yahooapis.com/v1/user/' + guid +
      '/profile?format=json'

    const options = {
      url: socialApiUrl,
      headers: { Authorization: 'Bearer ' + accessToken },
      rejectUnauthorized: false,
      json: true,
    }

    // 2. Retrieve profile information about the current user.
    request.get(options, function(err, response, body) {

      // 3. Create a new user account or return an existing one.
      User.findOne({ guid: guid }, function(err, existingUser) {
        if (existingUser) {
          req.session.user = existingUser
          return res.redirect('/')
        }

        const user = new User({
          guid: guid,
          email: body.profile.email,
          profileImage: body.profile.image.imageUrl,
          firstName: body.profile.givenName,
          lastName: body.profile.familyName,
          accessToken: accessToken,
        })

        user.save(function(err) {
          req.session.user = user
          res.redirect('/')
        })
      })
    })
  })
})

router.get('/logout', function(req, res) {
  delete req.session.user
  res.redirect('/')
})

module.exports = router



