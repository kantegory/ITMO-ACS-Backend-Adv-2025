import 'reflect-metadata';
import { Repository, ObjectLiteral, EntityTarget, DeepPartial, Not } from 'typeorm';
import { CreateMessageDto } from '../dtos/createMessageDto';

import axios from 'axios';

export class ChatService
{
    API_URL: string;
    constructor()
    {
        this.API_URL = 'http://chat:3004/chat/api/messages'
    }

    async setLog(authToken: string, message: CreateMessageDto): Promise<ObjectLiteral> {
        console.log(`${this.API_URL}/create`)
        return (await axios.post(`${this.API_URL}/create`, message, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
        })).data
    }
}