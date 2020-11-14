const Router = require('koa-router')
const route = new Router({ prefix: '/api' })
const { index } = require('../controllers/home')

route.get('/', index)

module.exports = route
