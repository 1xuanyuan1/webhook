const http = require('http')
const exec = require('exec')
const url = require('url')

const PORT = process.env.PORT || 9988
const PATH = '../'

var deployServer = http.createServer(function(request, response) {
  // console.log(request)
let query = url.parse(request.url,true).query
if (request.url.search(/deploy\/?/) > 0) {

  var commands = [
    `cd ${PATH}${query.path}`,
    'git pull'
  ].join(' && ')

  exec(commands, function(err, out, code) {
    if (err instanceof Error) {
      response.writeHead(500)
      response.end('Server Internal Error.')
      throw err
    }
    process.stderr.write(err)
    process.stdout.write(out)
    response.writeHead(200)
    response.end('Deploy Done.')

  })

} else {

  response.writeHead(404)
  response.end('Not Found.')

}
})

deployServer.listen(PORT)