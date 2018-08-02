const rabbit = require('./lib/rabbit')
const queueName = 'my-queue-name'

const main = async () => {
  await rabbit.createConnection('amqp://localhost')
  const channel = await rabbit.getChannel(queueName)

  channel.consume(queueName, msg => {
    if (msg !== null) {
      console.log(`${msg.content.toString()} ${Date.now()}`)
      // code
      channel.ack(msg)
    }
  })
}

main()
