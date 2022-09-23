const Router = require('koa-router')
const util = require('../utils/utils')
const router = new Router({prefix: '/menu'})
const {auth} = require('../middleware/auth.middleware')
const {operate} = require('../controller/menu.controller')
router.post('/operate',operate)

module.exports = router