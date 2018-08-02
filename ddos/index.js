const request = require('request')

const wait = (timeout = 1000) => new Promise(resolve => setTimeout(() => resolve(), timeout))

const ddos = async timeout => {
  while (true) {
    var options = { method: 'GET', url: 'http://localhost:3000' }
    await request(options)
    await wait(timeout)
  }
}

ddos(Number(process.argv.slice(2)[0]))
