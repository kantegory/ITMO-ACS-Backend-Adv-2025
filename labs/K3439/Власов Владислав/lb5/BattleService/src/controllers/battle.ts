import 'reflect-metadata';
import {
    Param,
    Patch,
    Controller,
    UseBefore,
    Req,
    Get
} from 'routing-controllers';



import authMiddleware, { RequestWithUserId } from '../middlewares/auth';
import { IBattleService } from '../services/interfaces/IBattleService';
import { BattleService } from '../services/BattleService';
import { OpenAPI } from 'routing-controllers-openapi';
import { EffectService } from '../services/EffectService';
import { IEffectService } from '../services/interfaces/IEffectService';


@Controller('/battle')
export class BattleController{

    _service: IBattleService
    _serviceEffect: IEffectService

    constructor()
    {
        this._service = new BattleService()
        this._serviceEffect = new EffectService()
    }

    @UseBefore(authMiddleware)
    @Patch("/:attackCharId/attack/:defenceCharId/")
    async createEdge(
        @Req() request: RequestWithUserId,
        @Param('attackCharId') attackCharId: number,
        @Param('defenceCharId') defenceCharId: number,
    )
    {
        await this._service.Attack(request.userId, attackCharId, defenceCharId, request.token)
        return { "message": "attack Ok" }
    }

    @UseBefore(authMiddleware)
    @Get("/getCond/:effectId")
    async getConditions(
        @Req() request: RequestWithUserId,
        @Param('effectId') effectId: number,
    )
    {
        const effects = await this._serviceEffect.getConditions(request.token, effectId)
        return effects
    }
}