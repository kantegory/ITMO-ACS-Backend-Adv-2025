import { CreateMessageDto } from '../dtos/createMessageDto';
import { redis } from '../config/redis-sourse';


export class ChatService
{
    async sendBattleLog(message: CreateMessageDto) {

        const serializedData = JSON.stringify(message);
        await redis.lpush('battle_log', serializedData);
        console.log(`Отправлено! ${serializedData}`)
    }
}