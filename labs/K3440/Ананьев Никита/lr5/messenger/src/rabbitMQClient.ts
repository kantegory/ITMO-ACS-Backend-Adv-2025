import amqp from 'amqplib'

export async function createRabbitConnection() {
  const connection = await amqp.connect(process.env.RABBIT_URL!)
  const channel = await connection.createChannel()

  return { connection, channel }
}
