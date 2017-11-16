const express = require('express')
const qs = require('querystring')
const session = require('express-session')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const request = require('request')

const clientId = process.env.CLIENT_ID ||
  'dj0yJmk9NE84WkdON0FYc1lrJmQ9WVdrOWNEY3liVTV2TXpJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yMg--'
const clientSecret = process.env.CLIENT_SECRET ||
  'b1e6188c344ae20ff81e904afeaa3975e4cdd699'
const redirectUri = process.env.REDIRECT_URI ||
  'http://fantasy-sherpa.com/auth/yahoo/callback'

const userSchema = new mongoose.Schema({
  guid: String,
  email: String,
  profileImage: String,
  firstName: String,
  lastName: String,
  accessToken: String,
})

const User = mongoose.model('User', userSchema)

mongoose.connect(process.env.MONGODB_URI || 'localhost')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  if (!req.session.user) {
    return res.render('login', {
      title: 'Login',
    })
  }
  res.render('index', {
    title: 'Home',
    user: req.session.user,
  })
})

app.get('/login-successful', function(req, res) {
  if (!req.session.user) {
    return res.redirect('/')
  }
  return res.sendFile(path.join(__dirname, 'public/client/index.html'))
})

app.get('/auth/yahoo', function(req, res) {
  const authorizationUrl = 'https://api.login.yahoo.com/oauth2/request_auth'

  const queryParams = qs.stringify({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
  })

  res.redirect(authorizationUrl + '?' + queryParams)
})

app.get('/auth/yahoo/callback', function(req, res) {
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
          return res.redirect('/login-successful')
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

app.get('/logout', function(req, res) {
  delete req.session.user
  res.redirect('/')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
