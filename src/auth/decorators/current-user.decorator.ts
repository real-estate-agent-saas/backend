import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { AuthRequest } from '../models/AuthRequest';

// Esse decorator é usado para acessar o usuário autenticado em qualquer lugar do código
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);