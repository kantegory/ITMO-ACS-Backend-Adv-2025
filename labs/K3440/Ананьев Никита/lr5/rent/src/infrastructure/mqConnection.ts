import { Container } from 'typedi'
import amqp from 'amqplib'

export const RABBIT_CHANNEL = 'RABBIT_CHANNEL'

export async function initRabbitMQ() {
    const connection = await amqp.connect(process.env.RABBIT_URL!)
    const channel = await connection.createChannel()

    Container.set(RABBIT_CHANNEL, channel)
}