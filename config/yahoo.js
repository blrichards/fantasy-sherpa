
const clientId = process.env.CLIENT_ID ||
  'dj0yJmk9NE84WkdON0FYc1lrJmQ9WVdrOWNEY3liVTV2TXpJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yMg--'

const clientSecret = process.env.CLIENT_SECRET ||
  'b1e6188c344ae20ff81e904afeaa3975e4cdd699'

const redirectUri = process.env.REDIRECT_URI ||
  'http://fantasy-sherpa.com/auth/yahoo/callback'

module.exports = {
  clientId,
  clientSecret,
  redirectUri
}