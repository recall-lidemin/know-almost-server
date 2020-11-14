const Router = require('koa-router')
const route = new Router({ prefix: '/api' })
const { find, create, update, del } = require('../controllers/users')

route.get('/users', find)
route.post('/users', create)
route.put('/users/:id', update)
route.delete('/users/:id', del)
module.exports = route
