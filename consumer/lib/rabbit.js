const amqplib = require('amqplib')
let _conn

const createConnection = async (url = 'amqp://localhost') => {
  const conn = await amqplib.connect(url, { username: 'guest', password: 'guest' })
  _conn = conn
  return conn
}

const createChannel = async (conn = _conn) => {
  const channel = await conn.createChannel()
  return channel
}

const getChannel = async queueName => {
  const channel = await createChannel()
  await channel.assertQueue(queueName)
  return channel
}

const sendMessage = async (channel, buffer) => {
  channel.sendToQueue(channel, buffer)
}

module.exports = {
  conn: _conn,
  createConnection,
  createChannel,
  getChannel,
  sendMessage
}
