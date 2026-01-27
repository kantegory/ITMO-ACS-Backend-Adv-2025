import { Service, Inject } from 'typedi'
import amqp from 'amqplib'

import { RABBIT_CHANNEL } from './mqConnection'

@Service('rent.publisher')
export class RentPublisher {
    constructor(
        @Inject(RABBIT_CHANNEL)
        private readonly channel: amqp.Channel
    ) {}

    async rentCreated(event: any) {
        const exchange = 'rent.events'

        await this.channel.assertExchange(exchange, 'topic', { durable: true })

        this.channel.publish(
            exchange,
            'rent.created',
            Buffer.from(JSON.stringify(event)),
            { persistent: true }
        )
    }
}