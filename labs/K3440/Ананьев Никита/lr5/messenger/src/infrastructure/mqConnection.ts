import { Container } from 'typedi'
import amqp from 'amqplib'

export const RABBIT_CHANNEL = 'RABBIT_CHANNEL'

export async function initRabbitMQ() {
    console.log("Подключение к очереди сообщений...")
    const connection = await amqp.connect(process.env.RABBIT_URL!)

    console.log("Соединение с очередью установлено!")
    const channel = await connection.createChannel()

    Container.set(RABBIT_CHANNEL, channel)
    return channel
}