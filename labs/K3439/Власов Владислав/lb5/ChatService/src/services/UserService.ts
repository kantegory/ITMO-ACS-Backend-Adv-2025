import 'reflect-metadata';
import { Repository, ObjectLiteral, EntityTarget, DeepPartial, Not } from 'typeorm';

import axios from 'axios';

export class UserService
{
    API_URL: string;
    constructor()
    {
        this.API_URL = 'http://users:3001/users/api/users'
    }

    async getUser(authToken: string, id: number): Promise<number> {
        console.log(`${this.API_URL}/${id}`)
        try {
            const responce = (await axios.get(`${this.API_URL}/${id}`, {
                headers: {
                'Authorization': `Bearer ${authToken}`
                }
            }))
            return 200
        } catch {
            return 404
        }
    }
}