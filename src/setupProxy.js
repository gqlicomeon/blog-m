//代理配置
const proxy = require("http-proxy-middleware")

module.exports = function (app) {
  app.use(proxy("/api", {
    target: "http://www.gqlicomeon.com"
  }))
}