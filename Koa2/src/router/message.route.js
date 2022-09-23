const Router = require('koa-router')
const util = require('../utils/utils')
const router = new Router({prefix: '/message'})
const {auth} = require('../middleware/auth.middleware')
const {getMessageList} = require('../controller/message.controller')
router.get('/list',auth,getMessageList)
module.exports = router