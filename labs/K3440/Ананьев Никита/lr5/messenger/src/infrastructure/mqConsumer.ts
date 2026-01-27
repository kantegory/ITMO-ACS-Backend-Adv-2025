import amqp from 'amqplib'
import { RentCreatedHandler } from './rentCreatedHandler'
import { Container } from 'typedi'

export async function rentCreatedConsumer(channel: amqp.Channel) {
    const exchange = 'rent.events'
    const queue = 'messenger.rent.created'
    const consumer = Container.get(RentCreatedHandler)

    console.log("Start consumer...")

    await channel.assertExchange(exchange, 'topic', { durable: true })
    await channel.assertQueue(queue, { durable: true })
    await channel.bindQueue(queue, exchange, 'rent.created')

    channel.consume(queue, async (msg) => {
        if (!msg) return

        const event = JSON.parse(msg.content.toString())

        try {
            await consumer.handle(event)
            channel.ack(msg)
        } catch (e) {
            console.error(e)
            channel.nack(msg, false, true)
        }
    })
}
