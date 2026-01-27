import { Service, Inject } from 'typedi'
import { MessageDto } from '../dtos/MessageDtos'
import { MessageService } from '../services/MessageService'

@Service()
export class RentCreatedHandler {
    constructor(
        @Inject('IMessageService')
        private readonly messageService: MessageService
    ) {}

    async handle(event: any) {
        const { ...fields } = event
        const dto = new MessageDto(fields)
        await this.messageService.send(dto)
    }
}