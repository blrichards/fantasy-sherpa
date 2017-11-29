const express = require('express')
const router = express.Router()

/** Import sub-routers **/

const ysports = require('./ysports')
const user = require('./user')

/** Attach to main api router **/

router.use('/ysports', ysports)
router.use('/user', user)

module.exports = router
