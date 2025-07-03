import {
    BadRequestException,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoginRequestBody } from '../models/LoginRequestBody';
import { validate } from 'class-validator';

@Injectable()
// Esse middleware é responsável por validar o corpo da requisição de login para não fazer requisições inválidas atoa
export class LoginValidationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const body = req.body;

        // Verifica se o corpo da requisição contém os campos necessários
        const loginRequestBody = new LoginRequestBody();
        loginRequestBody.email = body.email;
        loginRequestBody.password = body.password;

        const validations = await validate(loginRequestBody);

        // Se houver validações, lança uma exceção BadRequestException com as mensagens de erro
        if (validations.length) {
            throw new BadRequestException(
                validations.reduce((acc, curr) => {
                    return [...acc, ...(curr.constraints ? Object.values(curr.constraints) : [])];
                }, []),
            );
        }
        // Se não houver validações, chama o próximo middleware ou rota
        next();
    }
}