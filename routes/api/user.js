const express = require('express')
const router = express.Router()
const { clientId, clientSecret } = require('../../config/yahoo')

router.get('/', (req, res) => {
  const user = {
    ...req.session.user,
    clientId,
    clientSecret
  }
  res.send(user)
})

module.exports = router
