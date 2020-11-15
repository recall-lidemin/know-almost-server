const Router = require('koa-router')
const route = new Router({ prefix: '/api' })
const { index, upload } = require('../controllers/home')

route.get('/', index)
route.post('/upload', upload)

module.exports = route
