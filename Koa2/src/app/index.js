const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()
var log4js = require('../utils/log4j.utils');
const userRouter = require('../router/user.route')
app.use(koaBody())
const cors = require('@koa/cors');
app.use(cors()); //使用cors中间件
app.use(userRouter.routes())
// log4js.error('111')
// logger.level = "debug";
// logger.debug("Some debug messages");
require('../db/seq')
// app.use(seq());
module.exports = app
