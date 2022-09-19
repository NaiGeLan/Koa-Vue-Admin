const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()
var log4js = require('../utils/log4j.utils');
const userRouter = require('../router/user.route')
app.use(koaBody())

app.use(userRouter.routes())
// log4js.error('111')
// logger.level = "debug";
// logger.debug("Some debug messages");
module.exports = app
