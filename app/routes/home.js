const Router = require('koa-router')
const route = new Router({ prefix: '/api' })
const { upload } = require('../controllers/home')

route.post('/upload', upload)

module.exports = route
