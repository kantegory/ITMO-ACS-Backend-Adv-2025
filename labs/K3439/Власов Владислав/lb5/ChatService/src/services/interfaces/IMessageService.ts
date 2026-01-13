import { DeepPartial, ObjectLiteral } from "typeorm";
import { IBaseCrudService } from "./IBaseCrudService";

export interface IMessageService
{
    post(autherId: number, entity: DeepPartial<ObjectLiteral>, authToken: string): Promise<ObjectLiteral>
    getAll(): Promise<ObjectLiteral[]>
    get(id: number): Promise<ObjectLiteral>
}