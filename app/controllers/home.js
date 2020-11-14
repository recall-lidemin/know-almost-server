class HomeCtl {
  index(ctx) {
    ctx.body = '123456'
  }
}

module.exports = new HomeCtl()
