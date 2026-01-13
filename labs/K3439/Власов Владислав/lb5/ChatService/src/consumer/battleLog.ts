import dataSource from '../config/data-source';
import { redis } from '../config/redis-sourse';
import { CreateChatHistoryDto } from '../dtos/createChatHistoryDto';
import { CreateMessageDto } from '../dtos/createMessageDto';
import { ChatEventType, ChatHistory } from '../models/ChatHistory';
import { Message } from '../models/Message';

export async function startQueueConsumer() {
  console.log('👷 Background Worker: Ожидание задач...');

  const consumerRedis = redis.duplicate(); 
  const _repository = dataSource.getRepository(Message)
  const _chatHistoryRepository = dataSource.getRepository(ChatHistory)

  while (true) {
    try {
      const result = await consumerRedis.brpop('battle_log', 0);
      console.log(`Получено сообщение! ${result}`)
      
      if (result) {
        const [_, data] = result;
        const entity: CreateMessageDto = JSON.parse(data);
        
        const createdMessage = _repository.create(entity) as Message;
        createdMessage.authorId = 1 // Пока так, пусть будет некий "админ"
        const message = await _repository.save(createdMessage);

        console.log(`Сообщение сохранено`)

        const chatHisoryDto = new CreateChatHistoryDto()
        chatHisoryDto.message = message
        chatHisoryDto.eventType = ChatEventType.MESSAGE
        const createdHistory = _chatHistoryRepository.create(chatHisoryDto);
        await _chatHistoryRepository.save(createdHistory)

        console.log(`История сохранена`)

      }
    } catch (err) {
      console.error('Ошибка очереди:', err);
    }
  }
}