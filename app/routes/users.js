const Router = require('koa-router')
const route = new Router({ prefix: '/api' })
const { find, create, update, del, login } = require('../controllers/users')

route.get('/users', find)
route.post('/users', create)
route.patch('/users/:id', update)
route.delete('/users/:id', del)
route.post('/login', login)

module.exports = route
