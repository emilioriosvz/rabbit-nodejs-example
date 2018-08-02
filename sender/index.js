const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const rabbit = require('./lib/rabbit')
const queueName = 'my-queue-name'
// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// log the request
app.use(require('morgan')('combined'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  const channel = app.get('my-channel')
  channel.sendToQueue(queueName, Buffer.from('Hello Rabbit'))
  res.json({ success: true })
})

app.listen(3000, async () => {
  await rabbit.createConnection('amqp://localhost')
  const channel = await rabbit.getChannel(queueName)
  app.set('my-channel', channel)
  console.log(`Api running on port 3000`)
})
