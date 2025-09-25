import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthRequest } from '../models/AuthRequest';
import { User } from 'src/domain/entities/user.entity';

// Esse decorator é usado para acessar o usuário autenticado em qualquer lugar do código
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);