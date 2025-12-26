const http = require('http');
const DEFAULT_USER = {
  username: 'GuilhermeCadilhe',
  password: '123'
}
const { once } = require('events')

const routes = {
  '/contact:get': (request, response) => {
    response.write('Contact Us Page')
    return response.end()
  },
  '/login:post': async (request, response) => {
    //for await (const data of request) {...}
    const user = JSON.parse(await once(request, 'data'))
    const toLower = (text) => text.toLowerCase()
    // curl -i -X POST --data '{"username":"guilhermecadilhe","password":"123"}' localhost:3000/login
    if (toLower(user.username) !== toLower(DEFAULT_USER.username) || user.password !== DEFAULT_USER.password) {
      response.writeHead(401)
      return response.end('Login Failed')
    }
    return response.end("Login Success")
  },
  default(request, response) {
    response.writeHead(404)
    return response.end("not found")
  }
}

function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default
  return chosen(request, response)
}

const app = http.createServer(handler)
  .listen(3000, () => console.log('Server is running at port 3000'));

module.exports = app